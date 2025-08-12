const { cmd } = require("../command");
const gtts = require("google-tts-api");
const fetch = require("node-fetch");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const tmp = require("tmp-promise");
const path = require("path");

cmd(
  {
    pattern: "tts",
    alias: ["voice", "speak"],
    desc: "Convert text to a voice note (PTT). Usage: .tts [lang] <text>",
    category: "utility",
    filename: __filename,
  },
  async (robin, mek, m, { from, quoted, body, args, reply }) => {
    try {
      // 1) Get text: prefer explicit args, fallback to quoted text
      let text = "";
      let lang = "en"; // default language

      if (args && args.length) {
        // if first arg looks like a language code (2-3 letters), allow lang override
        if (/^[a-z]{2,3}$/i.test(args[0]) && args.length > 1) {
          lang = args[0].toLowerCase();
          text = args.slice(1).join(" ");
        } else {
          text = args.join(" ");
        }
      } else if (quoted && quoted.message) {
        // try to extract text from quoted message
        const quotedText =
          quoted.message?.conversation ||
          quoted.message?.extendedTextMessage?.text ||
          quoted.message?.imageMessage?.caption ||
          "";
        text = quotedText;
      }

      if (!text || !text.trim()) {
        return reply("Provide text or reply to a text message. Usage: .tts [lang] <text>");
      }

      // enforce length limit (google-tts-url limit per request ~200 chars)
      const MAX_CHARS = 1000; // we will chunk if needed
      if (text.length > MAX_CHARS) {
        return reply(`Text too long. Please limit to ${MAX_CHARS} characters.`);
      }

      // 2) Create temp files
      const tmpDir = await tmp.dir({ unsafeCleanup: true });
      const tmpMp3 = path.join(tmpDir.path, "tts.mp3");
      const tmpOgg = path.join(tmpDir.path, "tts.ogg");

      // 3) Get google-tts-api URL (it may return a direct url for small text)
      // google-tts-api will auto-split if you use the `getAudioUrl` on short texts; for longer we could chunk.
      const ttsUrl = gtts.getAudioUrl(text, {
        lang,
        slow: false,
        host: "https://translate.google.com",
      });

      // 4) download mp3 to temp
      const res = await fetch(ttsUrl);
      if (!res.ok) {
        await tmpDir.cleanup();
        return reply("Failed to fetch TTS audio from provider.");
      }
      const arrayBuffer = await res.arrayBuffer();
      await fs.writeFile(tmpMp3, Buffer.from(arrayBuffer));

      // 5) convert mp3 -> ogg (opus) using ffmpeg so WhatsApp accepts it as ptt
      // We will create an opus OGG with mono 48000 Hz (WhatsApp likes opus)
      await new Promise((resolve, reject) => {
        ffmpeg(tmpMp3)
          .outputOptions([
            "-map 0:a",
            "-c:a libopus",
            "-b:a 64k",
            "-vbr on",
            "-application audio",
            "-ac 1",
            "-ar 48000",
          ])
          .save(tmpOgg)
          .on("end", resolve)
          .on("error", (err) => reject(err));
      });

      // 6) read buffer and send as voice note (PTT)
      const oggBuffer = await fs.readFile(tmpOgg);

      await robin.sendMessage(from, { audio: oggBuffer, ptt: true }, { quoted: mek });

      // 7) cleanup
      await tmpDir.cleanup();
    } catch (err) {
      console.error("TTS error:", err);
      reply("Error creating voice note: " + (err.message || err));
    }
  }
);

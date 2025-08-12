// vtt.js - Voice-to-Text command using OpenAI Whisper API

const { cmd } = require("../command");
const fs = require("fs-extra");
const tmp = require("tmp-promise");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const OpenAI = require("openai");

// Initialize OpenAI client with API key from env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

cmd(
  {
    pattern: "vtt",
    alias: ["voicetext", "speech"],
    desc: "Convert a voice note to text using OpenAI Whisper",
    category: "utility",
    filename: __filename,
  },
  async (robin, mek, m, { from, quoted, reply }) => {
    try {
      if (!quoted || !(quoted.audioMessage || quoted.message?.audioMessage)) {
        return reply("Reply to a voice note or audio file to transcribe.");
      }

      // Create temporary directory for files
      const tmpDir = await tmp.dir({ unsafeCleanup: true });
      const inputOggPath = path.join(tmpDir.path, "input.ogg");
      const inputMp3Path = path.join(tmpDir.path, "input.mp3");

      // Download the quoted voice note or audio
      const audioBuffer = await robin.downloadMediaMessage(quoted);
      await fs.writeFile(inputOggPath, audioBuffer);

      // Convert OGG/Opus to MP3 for Whisper API
      await new Promise((resolve, reject) => {
        ffmpeg(inputOggPath)
          .toFormat("mp3")
          .save(inputMp3Path)
          .on("end", resolve)
          .on("error", reject);
      });

      // Send MP3 file to OpenAI Whisper API for transcription
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(inputMp3Path),
        model: "whisper-1",
      });

      const text = transcription.text?.trim() || "No speech detected.";
      await reply(`🗣 *Transcription:* ${text}`);

      // Clean up temporary files
      await tmpDir.cleanup();
    } catch (error) {
      console.error("Voice to Text error:", error);
      reply(`Error transcribing voice note: ${error.message || error}`);
    }
  }
);

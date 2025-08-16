const { malvin } = require('../malvin');

const tinyCaps = (text) => {
  const map = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
  };
  return text.split('').map(c => map[c.toLowerCase()] || c).join('');
};

malvin({
  pattern: "dev",
  alias: ["developer", "dev"],
  desc: "Displays the developer info",
  category: "owner",
  react: "👨‍💻",
  filename: __filename
}, async (malvin, mek, m, { from, reply, pushname }) => {
  try {
    const name = pushname || "there";

    const caption = `
╭─⌈ *👨‍💻 ${tinyCaps("Gimaa-Md developer")}* ⌋─
│
│ 👋 Hello, *${name}*!
│
│ 🤖 I'm *ＧIᗰ𝛥𝛥*, the creator & maintainer
│    of this smart WhatsApp bot.
│
│ 👨‍💻 *OWNER INFO:*
│ ───────────────
│ 🧠 Name    : Thisara Gimhana
│ 🎂 Age     : 999+
│ 📞 Contact : wa.me/94704198014
│
│👨‍💻 *ADMIN INFO:*
| 🧠 Name    : SHEW OFFICIAL
│ 🎂 Age     : 999+
│ 📞 Contact : wa.me/94
│
╰───────────────

> ⚡ *Powered by GIMAA-MD*
`.trim();

    await malvin.sendMessage(
      from,
      {
        image: { url: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
        caption,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '',
            newsletterName: 'GIMAA-MD',
            serverMessageId: 143
          },
          externalAdReply: {
            title: "GIMAA-MD Bot",
            body: "Created with ❤️ by ＧIᗰ𝛥𝛥",
            thumbnailUrl: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg',
            mediaType: 1,
            renderSmallerThumbnail: true,
            showAdAttribution: true,
          }
        }
      },
      { quoted: mek }
    );
  } catch (e) {
    console.error("Error in .owner command:", e);
    return reply(`❌ Error: ${e.message || e}`);
  }
});

const config = require('../settings');
const axios = require('axios');
const { malvin, commands } = require('../malvin');

malvin({
  pattern: "live",
  desc: "Check if the bot is alive.",
  category: "main",
  react: "🟢",
  filename: __filename
},
async (malvin, mek, m, {
  from, sender, pushname, reply
}) => {
  try {
    const caption = `
*👋 Hello ${pushname}! I'm alive and running...*

╭── 〘 Gimaa-M𝗗 〙
│✨ *Name* : Gimaa-MD
│👑 *Creator* : Gimaa
│⚙️ *Version* : ${config.version}
│📂 *Script Type* : Plugins
╰─────────────⭑

🧠 I’m an automated WhatsApp assistant that helps you get data, search, and more – all inside WhatsApp!

*❗ Please follow the rules:*
1. 🚫 No spam
2. 🚫 Don’t call the bot
3. 🚫 Don’t call the owner
4. 🚫 Don’t spam the owner

🔖 Type *.menu* to explore all commands.

© 2025 Gimaa
    `.trim();

    await malvin.sendMessage(from, {
      image: { url: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
      caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '',
          newsletterName: 'Gimaa-MD',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    reply(`❌ Error: ${err}`);
  }
});

const { malvin } = require('../malvin');
const config = require('../settings');

malvin({
  pattern: "owner",
  react: "📞",
  desc: "Send bot owner's contact",
  category: "main",
  filename: __filename
}, async (malvin, mek, m, { from, reply }) => {
  try {
    const ownerName = config.OWNER_NAME || "Gimaa-MD";
    const ownerNumber = config.OWNER_NUMBER || "94704198014";

    // Build vCard contact
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${ownerName}`,
      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}`,
      "END:VCARD"
    ].join('\n');

    // Send vCard contact
    await malvin.sendMessage(from, {
      contacts: {
        displayName: ownerName,
        contacts: [{ vcard }]
      }
    });

    // Send image + caption
    await malvin.sendMessage(from, {
      image: { url: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
      caption: `
╭── ❍ Gimaa-MD ❍
│ ✦ 𝙽𝚊𝚖𝚎   : *${ownerName}*
│ ✦ 𝙽𝚞𝚖𝚋𝚎𝚛 : *${ownerNumber}*
│ ✦ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗 : *${config.version || 'Unknown'}*
╰───────────────⭓
> Stay connected for 🔥 updates!`,
      contextInfo: {
        mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '',
          newsletterName: 'Gimaa-MD',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("❌ Error in .owner command:", error);
    reply(`⚠️ An error occurred: ${error.message}`);
  }
});

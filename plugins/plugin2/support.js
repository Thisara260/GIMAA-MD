/*
Project Name : Gimaa-MD
Creator      : Thisara Gimhana
Repo         : https://github.com/Thisara260/GIMAA-MD
Support      : wa.me/263714757857
*/

const config = require('../settings');
const { malvin } = require('../malvin');
const { runtime } = require('../lib/functions');

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

malvin({
    pattern: "support",
    alias: ["follow", "links"],
    desc: "Display support and follow links",
    category: "main",
    react: "📡",
    filename: __filename
}, 
async (malvin, mek, m, {
    from, reply, pushname
}) => {
    try {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const uptimeFormatted = runtime(process.uptime());

        const message = `
╭─『 *Gimaa-M𝗗 - 𝗦𝗨𝗣𝗣𝗢𝗥𝗧* 』─
│ 👤 *Developer* : Gimaa
│ ⚙️ *Mode*      : ${config.MODE}
│ ⏱️ *Uptime*    : ${uptimeFormatted}
│ 💠 *Prefix*    : ${config.PREFIX}
│ 🔖 *Version*   : ${config.version}
│ 🕰️ *Time*      : ${currentTime}
╰─────────────

📢 *Follow & Support Gimaa-MD* ${readMore}

🔔 *Official WhatsApp Channel*
🔗 

🎬 *YouTube Channel*
🔗 

👨‍💻 *Developer Contact*
🔗 wa.me/94704198014?text=Hi%20Gimaa,%20I%20need%20support!

> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥
        `.trim();

        await malvin.sendMessage(from, {
            image: { url: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
            caption: message,
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

    } catch (e) {
        console.error("Support Cmd Error:", e);
        reply(`⚠️ An error occurred:\n${e.message}`);
    }
});

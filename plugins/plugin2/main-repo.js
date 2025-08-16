const fetch = require('node-fetch');
const config = require('../settings');
const { malvin } = require('../malvin');
const fs = require('fs');

malvin({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Fetch information about a GitHub repository.",
    react: "🪄",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Thisara260/GIMAA-MD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const repoData = await response.json();

        const formattedInfo = `
╭━━〔 *ᴍᴀʟᴠɪɴ xᴅ ʀᴇᴘᴏ* 🚀 〕━⬣
┃ 𖠌  *ɴᴀᴍᴇ*        : ${repoData.name}
┃ ⭐  *sᴛᴀʀs*       : ${repoData.stargazers_count}
┃ 🍴  *ғᴏʀᴋs*       : ${repoData.forks_count}
┃ 👤  *ᴏᴡɴᴇʀ*       : Gimaa
┃ 🧾  *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ* : ${repoData.description || 'N/A'}
┃ 🔗  *ʀᴇᴘᴏ ʟɪɴᴋ*   : ${githubRepoURL}
┃ 🧠  *ᴛʏᴘᴇ .allmenu ᴛᴏ sᴛᴀʀᴛ*
╰━━━━━━━━━━━━━━━⬣`;

        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: 'Gimaa-MD repo',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio intro
        await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/wz8rh7.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: mek });
    

    } catch (error) {
        console.error("❌ Error in repo command:", error);
        reply("⚠️ Failed to fetch repo info. Please try again later.");
    }
});

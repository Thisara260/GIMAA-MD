const axios = require('axios');
const config = require('../settings');
const { malvin } = require('../malvin');
const moment = require('moment-timezone');

malvin({
    pattern: 'version',
    react: '🚀',
    desc: 'check bot version & updates 📦',
    category: 'info',
    use: '.version',
    filename: __filename
}, async (malvin, mek, m, { from, sender, reply }) => {
    try {
        await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

        const time = moment().tz('Sri Lanka/Colomboe').format('HH:mm:ss');
        const date = moment().tz('Sri Lanka/Colombo').format('DD/MM/YYYY');
        const localPackage = require('../package.json');
        const currentVersion = localPackage.version;

        let latestVersion = 'Unknown';
        let status = '🔍 *Remote check disabled*';

        // Check if remote version checking is enabled (optional config toggle)
        if (config.CHECK_VERSION !== false) {
            const repoUrl = config.REPO || 'https://github.com/Thisara260/GIMAA-MD';
            const repoPath = repoUrl.replace('https://github.com/', '');
            const rawUrl = `https://raw.githubusercontent.com/${repoPath}/master/package.json`;

            const { data: remotePackage } = await axios.get(rawUrl, { timeout: 15000 });
            latestVersion = remotePackage.version || 'Unknown';
            status = currentVersion === latestVersion
                ? '✅ *up-to-date*'
                : '⚠️ *update available*';
        }

        const caption = `
╭───[ *ʙᴏᴛ ᴠᴇʀsɪᴏɴ* ]───
│
├ *ᴄᴜʀʀᴇɴᴛ*: v${currentVersion} 📍
├ *ʟᴀᴛᴇsᴛ*: v${latestVersion} 🆕
├ *sᴛᴀᴛᴜs*: ${status}
│
├ *ᴄʜᴇᴄᴋᴇᴅ*: ${date} 🗓️
├ *ᴛɪᴍᴇ*: ${time} 🕒
│
├ *ʙᴏᴛ*: ${config.BOT_NAME || 'Gimaa-MD'} 🤖
├ *ᴅᴇᴠᴇʟᴏᴘᴇʀ*: ${config.DEV_NAME || 'Gimaa'} 👑
├ *ʀᴇᴘᴏ*: ${config.REPO || 'https://github.com/Thisara260/GIMAA-MD'} 📦
│
├ ⭐ *Star the repo to support!*
╰───[ *Gimaa-Mᴅ* ]───
> *powered by malvin* ♡`;

        await malvin.sendMessage(from, {
            image: { url: config.ALIVE_IMG || 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg' },
            caption,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: config.BOT_NAME ? `${config.BOT_NAME} Bot` : 'Gimaa-Mᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await malvin.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error('❌ version check error:', error);

        const localVersion = require('../package.json').version;
        const caption = `
╭───[ *ᴠᴇʀsɪᴏɴ ᴇʀʀᴏʀ* ]───
│
├ *ʟᴏᴄᴀʟ ᴠᴇʀsɪᴏɴ*: v${localVersion} 📍
├ *ᴇʀʀᴏʀ*: ${error.message || 'unknown error'} ❌
├ *ʀᴇᴘᴏ*: ${config.REPO || 'not configured'} 📦
│
╰───[ *Gimaa-MD* ]───
> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥`;

        await reply(caption);
        await malvin.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
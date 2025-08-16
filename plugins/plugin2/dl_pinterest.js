const { malvin } = require('../malvin');
const axios = require('axios');

malvin({
    pattern: "pindl",
    alias: ["pinterestdl", "pin", "pins", "pindownload"],
    desc: "download media from pinterest",
    category: "download",
    filename: __filename
}, async (malvin, mek, m, { args, quoted, from, reply }) => {
    try {
        if (!args[0]) {
            return reply('❎ please provide a pinterest url.');
        }

        const pinterestUrl = args[0];
        await malvin.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(pinterestUrl)}`);
        
        if (!response.data.success || !response.data.result?.media) {
            return reply('❎ failed to fetch pinterest media.');
        }

        const { media, description = 'no description', title = 'no title' } = response.data.result;
        
        // Prioritize high-quality video (720p or highest available), fallback to image
        const videoUrl = media.find(item => item.type.includes('720p'))?.download_url || 
                       media.find(item => item.type.includes('video'))?.download_url;
        const imageUrl = media.find(item => item.type === 'Thumbnail')?.download_url || media[0]?.download_url;

        if (!videoUrl && !imageUrl) {
            return reply('❎ no downloadable media found.');
        }

        const caption = `
╭───〔 *Gimaa-Mᴅ* 〕──┈⊷
┃▸╭───────────
┃▸┊๏ *ᴘɪɴᴛᴇʀᴇsᴛ ᴅʟ*
┃▸╰───────────···๏
╰────────────────┈⊷
╭──┈┈┈┈┈┈┈┈┈──⪼
┇๏ *ᴛɪᴛʟᴇ* - ${title}
┇๏ *ᴅᴇsᴄ* - ${description}
┇๏ *ᴛʏᴘᴇ* - ${videoUrl ? 'video' : 'image'}
╰──┈┈┈┈┈┈┈┈┈──⪼
> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥`;

        // Send media based on type
        const messageOptions = { quoted: mek };
        if (videoUrl) {
            await malvin.sendMessage(from, { video: { url: videoUrl }, caption }, messageOptions);
        } else {
            await malvin.sendMessage(from, { image: { url: imageUrl }, caption }, messageOptions);
        }

        await malvin.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error('❌ error:', e);
        await malvin.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply('❎ error downloading pinterest media.');
    }
});
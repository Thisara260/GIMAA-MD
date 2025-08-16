const axios = require("axios");
const config = require('../settings');
const { malvin } = require("../malvin");

malvin({
  pattern: "tiktok",
  alias: ["tt", "tiktokdl"],
  react: '📥',
  desc: "Download TikTok video",
  category: "download",
  use: ".tiktok <url>",
  filename: __filename
}, async (malvin, m, mek, { from, args, reply }) => {
  const tiktokUrl = args[0];

  if (!tiktokUrl || !tiktokUrl.includes("tiktok.com")) {
    return reply("❌ Please provide a valid TikTok URL.");
  }

  try {
    await malvin.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Try primary API
    let data;
    try {
      const res = await axios.get(`https://api.nexoracle.com/downloader/tiktok-nowm?apikey=free_key@maher_apis&url=${encodeURIComponent(tiktokUrl)}`);
      if (res.data?.status === 200) data = res.data.result;
    } catch (_) {}

    // Fallback API
    if (!data) {
      const fallback = await axios.get(`https://api.tikwm.com/?url=${encodeURIComponent(tiktokUrl)}&hd=1`);
      if (fallback.data?.data) {
        const r = fallback.data.data;
        data = {
          title: r.title,
          author: {
            username: r.author.unique_id,
            nickname: r.author.nickname
          },
          metrics: {
            digg_count: r.digg_count,
            comment_count: r.comment_count,
            share_count: r.share_count,
            download_count: r.download_count
          },
          url: r.play,
          thumbnail: r.cover
        };
      }
    }

    if (!data) return reply("❌ TikTok video not found.");

    const { title, author, url, metrics, thumbnail } = data;

    const caption = `🎬 *TikTok Downloader*\n
╭─❍ Gimaa-Mᴅ ❍
┊🎵 *Title:* ${title}
┊👤 *Author:* @${author.username} (${author.nickname})
┊❤️ *Likes:* ${metrics.digg_count}
┊💬 *Comments:* ${metrics.comment_count}
┊🔁 *Shares:* ${metrics.share_count}
┊📥 *Downloads:* ${metrics.download_count}
╰─❍
> ${config.FOOTER || "> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥"}`;

    await malvin.sendMessage(from, {
      image: { url: thumbnail },
      caption
    }, { quoted: mek });

    // Direct video download
    const loading = await malvin.sendMessage(from, { text: '⏳ Downloading video...' }, { quoted: mek });
    const videoBuffer = Buffer.from((await axios.get(url, { responseType: 'arraybuffer' })).data, 'binary');

    await malvin.sendMessage(from, {
      video: videoBuffer,
      caption: `🎥 Video by @${author.username}`
    }, { quoted: mek });

    await malvin.sendMessage(from, { text: "✅ Video sent!", edit: loading.key });

  } catch (err) {
    console.error("❌ Download error:", err);
    await reply("❌ Failed to download TikTok video.");
  }
});
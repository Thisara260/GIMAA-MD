const config = require('../settings');  
const { gimaa } = require('../gimaa');
const { runtime } = require('../lib/functions');
const os = require('os');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment-timezone');
const { randomStyle } = require('./textStyles'); // Import random text styles

// Simple logging function
const log = (level, message, error = null) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  console[level](`[${timestamp}] ${level.toUpperCase()}: ${message}`, error ? `\n${error.stack}` : '');
};

// Validate URL
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Context info for image messages
const getContextInfo = (sender, config) => ({
  mentionedJid: [sender],
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: config.NEWSLETTER_JID || '120363419121035382@newsletter',
    newsletterName: config.OWNER_NAME || 'GIMAA-MD',
    serverMessageId: 143,
  },
});

// Context info for audio messages
const getAudioContextInfo = (sender) => ({
  mentionedJid: [sender],
  forwardingScore: 999,
  isForwarded: true,
});

// Send menu message
const sendMenuMessage = async (gimaa, from, mek, caption, imageUrl, contextInfo) => {
  if (!isValidUrl(imageUrl)) {
    log('warn', `Invalid image URL: ${imageUrl}`);
    imageUrl = 'https://i.ibb.co/x8hP1DR4/shaban-md.jpg';
  }
  await gimaa.sendMessage(
    from,
    { image: { url: imageUrl }, caption, contextInfo },
    { quoted: mek }
  );
};

// Send audio message
const sendAudioMessage = async (gimaa, from, mek, audioUrl, contextInfo) => {
  if (audioUrl && isValidUrl(audioUrl)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await gimaa.sendMessage(
      from,
      { audio: { url: audioUrl }, mimetype: 'audio/mp4', ptt: true, contextInfo },
      { quoted: mek }
    );
  } else if (audioUrl) {
    log('warn', `Invalid audio URL: ${audioUrl}`);
  }
};

// Error handler
const handleError = (error, reply, menuName) => {
  log('error', `${menuName} Error`, error);
  reply(`❌ Error: Failed to display ${menuName.toLowerCase()} menu. Please try again later.\n\nDetails: ${error.message}`);
};

// Time info
const getTimeInfo = (timezone = config.TIMEZONE || 'Africa/Harare') => ({
  time: moment().tz(timezone).format('HH:mm:ss'),
  date: moment().tz(timezone).format('DD/MM/YYYY'),
  platform: os.platform(),
  uptime: runtime(process.uptime()),
});

// Paginate content
const paginateContent = (content, itemsPerPage = 20) => {
  const lines = content.split('\n');
  const pages = [];
  let currentPage = [];
  let itemCount = 0;

  for (const line of lines) {
    if (line.match(/^\s*│\s*[➸⬢✪⬩✷⊸➟]/)) itemCount++;
    currentPage.push(line);
    if (itemCount >= itemsPerPage && !line.startsWith('╰')) {
      pages.push(currentPage.join('\n'));
      currentPage = [lines[0]];
      itemCount = 0;
    }
  }
  if (currentPage.length > 1) pages.push(currentPage.join('\n'));
  return pages;
};

// Localization placeholder
const localizeContent = (content, lang = 'en') => content;

// Menus
const menus = {
  menu2: {
    pattern: 'menu',
    desc: 'Show the bot main menu',
    category: 'menu',
    react: '⚡',
    content: ({ time, date, platform, uptime }) => `
┌──[ *${randomStyle(config.BOT_NAME)}* ]──
│
│ 👑 Owner: ${randomStyle(config.OWNER_NAME)}
│ ⚙️ Mode: ${config.MODE}
│ 💻 Platform: ${platform}
│ 🧩 Type: NodeJs (Multi Device)
│ 🕒 Time: ${time}
│ 📅 Date: ${date}
│ ⏳ Uptime: ${uptime}
│ 🔢 Prefix: ${config.PREFIX}
│ 🚀 Version: ${config.version}
│
*Available Commands:*
*(Some commands are still in development)*
╔═══════════════════╗
🌐 *${randomStyle("General Commands")}*:
║ ➤ .help or .menu
║ ➤ .ping
║ ➤ .alive
║ ➤ .tts <text>
║ ➤ .owner
║ ➤ .joke
║ ➤ .quote
║ ➤ .fact
║ ➤ .weather <city>
║ ➤ .news
║ ➤ .attp <text>
║ ➤ .lyrics <song_title>
║ ➤ .8ball <question>
║ ➤ .groupinfo
║ ➤ .staff or .admins
║ ➤ .vv
║ ➤ .trt <text> <lang>
║ ➤ .ss <link>
║ ➤ .jid
╚═══════════════════╝

╔═══════════════════╗
📥 *${randomStyle("Downloader")}*:
║ ➤ .play <song_name>
║ ➤ .song <song_name>
║ ➤ .instagram <link>
║ ➤ .facebook <link>
║ ➤ .tiktok <link>
║ ➤ .video <song name>
║ ➤ .ytmp4 <Link>
╚═══════════════════╝

╔═══════════════════╗
👮‍♂️ *${randomStyle("Admin Commands")}*:
║ ➤ .ban @user
║ ➤ .promote @user
║ ➤ .demote @user
║ ➤ .mute <minutes>
║ ➤ .unmute
║ ➤ .delete or .del
║ ➤ .kick @user
║ ➤ .warnings @user
║ ➤ .warn @user
║ ➤ .antilink
║ ➤ .antibadword
║ ➤ .clear
║ ➤ .tag <message>
║ ➤ .tagall
║ ➤ .chatbot
║ ➤ .resetlink
║ ➤ .welcome <on/off>
║ ➤ .goodbye <on/off>
╚═══════════════════╝

╔═══════════════════╗
🔒 *${randomStyle("Owner Commands")}*:
║ ➤ .mode
║ ➤ .autostatus
║ ➤ .clearsession
║ ➤ .antidelete
║ ➤ .cleartmp
║ ➤ .setpp <reply to image>
║ ➤ .autoreact
╚═══════════════════╝

╔═══════════════════╗
🎨 *${randomStyle("Image/Sticker Commands")}*:
║ ➤ .blur <image>
║ ➤ .simage <reply to sticker>
║ ➤ .sticker <reply to image>
║ ➤ .tgsticker <Link>
║ ➤ .meme
║ ➤ .take <packname>
║ ➤ .emojimix <emj1>+<emj2>
╚═══════════════════╝

╔═══════════════════╗
🤖 *${randomStyle("AI Commands")}*:
║ ➤ .gpt <question>
║ ➤ .gemini <question>
║ ➤ .AI <prompt>
║ ➤ .ai <prompt>
╚═══════════════════╝

╔═══════════════════╗
🎯 *${randomStyle("Fun Commands")}*:
║ ➤ .compliment @user
║ ➤ .insult @user
║ ➤ .flirt
║ ➤ .shayari
║ ➤ .goodnight
║ ➤ .roseday
║ ➤ .character @user
║ ➤ .wasted @user
║ ➤ .ship @user
║ ➤ .simp @user
║ ➤ .stupid @user [text]
╚═══════════════════╝

╔═══════════════════╗
🔤 *${randomStyle("Textmaker")}*:
║ ➤ .metallic <text>
║ ➤ .ice <text>
║ ➤ .snow <text>
║ ➤ .impressive <text>
║ ➤ .matrix <text>
║ ➤ .light <text>
║ ➤ .neon <text>
║ ➤ .devil <text>
║ ➤ .purple <text>
║ ➤ .thunder <text>
║ ➤ .leaves <text>
║ ➤ .1917 <text>
║ ➤ .arena <text>
║ ➤ .hacker <text>
║ ➤ .sand <text>
║ ➤ .blackpink <text>
║ ➤ .glitch <text>
║ ➤ .fire <text>
╚═══════════════════╝

╔═══════════════════╗
💻 *${randomStyle("Github Commands")}*:
║ ➤ .git
║ ➤ .github
║ ➤ .sc
║ ➤ .script
║ ➤ .repo
╚═══════════════════╝

> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIMAA
    `,
    imageKey: null,
    audioUrl: config.MENU_AUDIO_URL || null,
  },
};

// Register menus
Object.values(menus).forEach((menu) => {
  gimaa(
    { pattern: menu.pattern, alias: menu.alias, desc: menu.desc, category: menu.category, react: menu.react, filename: __filename },
    async (gimaa, mek, m, { from, sender, reply, isCreator }) => {
      try {
        if (['ownermenu', 'settingsmenu', 'privacymenu'].includes(menu.pattern) && !isCreator) {
          return reply('❗ Only the bot owner can use this command.');
        }

        const timeInfo = getTimeInfo();
        let caption = typeof menu.content === 'function' ? menu.content(timeInfo) : menu.content;
        caption = localizeContent(caption);
        const imageUrl = config.MENU_IMAGES?.[menu.imageKey] || config.MENU_IMAGE_URL || 'https://files.catbox.moe/jw8h57.jpg';
        const imageContextInfo = getContextInfo(sender, config);
        const audioContextInfo = getAudioContextInfo(sender);

        if (menu.paginate) {
          const pages = paginateContent(caption);
          for (let i = 0; i < pages.length; i++) {
            const pageCaption = `${pages[i]}\n\nPage ${i + 1} of ${pages.length}`;
            await sendMenuMessage(gimaa, from, mek, pageCaption, imageUrl, imageContextInfo);
          }
        } else {
          await sendMenuMessage(gimaa, from, mek, caption, imageUrl, imageContextInfo);
        }

        await sendAudioMessage(gimaa, from, mek, menu.audioUrl, audioContextInfo);
      } catch (error) {
        handleError(error, reply, menu.desc.split(' ').slice(1).join(' '));
      }
    }
  );
});

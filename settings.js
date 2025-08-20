
const fs = require('fs');
const path = require('path');
const { getConfig } = require('./lib/configdb');
const settings = require('./settingss');

if (fs.existsSync(path.resolve('config.env'))) {
  require('dotenv').config({ path: path.resolve('config.env') });
}

// Helper to convert "true"/"false" strings to actual boolean
function convertToBool(text, trueValue = 'true') {
  return text === trueValue;
}

module.exports = {
  // ===== BOT CORE SETTINGS =====
  SESSION_ID: settings.SESSION_ID || process.env.SESSION_ID || "",
  PREFIX: getConfig("PREFIX") || "." || settings.PREFIX,
  CHATBOT: getConfig("CHATBOT") || "on",
  BOT_NAME: process.env.BOT_NAME || getConfig("BOT_NAME") || "Gimaa-Mᴅ",
  MODE: getConfig("MODE") || process.env.MODE || "private",
  REPO: process.env.REPO || "https://github.com/Thisara260/GIMAA-MD",
  BAILEYS: process.env.BAILEYS || "@whiskeysockets/baileys",

  // ===== OWNER & DEVELOPER SETTINGS =====
  OWNER_NUMBER: settings.OWNER_NUMBER || process.env.OWNER_NUMBER || "94704198014",
  OWNER_NAME: process.env.OWNER_NAME || getConfig("OWNER_NAME") || "ＧIᗰ𝛥𝛥",
  DEV: process.env.DEV || "94704198014",
  DEVELOPER_NUMBER: '',
  MENU_AUDIO_URL: process.env.MENU_AUDIO_URL || 'https://files.catbox.moe/pjlpd7.mp3',
NEWSLETTER_JID: process.env.NEWSLETTER_JID || '',

  // ===== AUTO-RESPONSE SETTINGS =====
  AUTO_REPLY: process.env.AUTO_REPLY || "false",
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Just seen ur status 😆 🤖*",
  READ_MESSAGE: process.env.READ_MESSAGE || "false",
  REJECT_MSG: process.env.REJECT_MSG || "*📵 Calls are not allowed on this number unless you have permission. 🚫*",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",
  LIVE_MSG: process.env.LIVE_MSG || "> ʙᴏᴛ ɪs sᴘᴀʀᴋɪɴɢ ᴀᴄᴛɪᴠᴇ ᴀɴᴅ ᴀʟɪᴠᴇ\n\n\nᴋᴇᴇᴘ ᴜsɪɴɢ GIMAA-MD ғʀᴏᴍ Gimaa tech\n\n\n*© ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ᴍᴅ\n\n> ɢɪᴛʜᴜʙ :* github.com/Thisara260/GIMAA-MD",

  // ===== REACTION & STICKER SETTINGS =====
  AUTO_REACT: process.env.AUTO_REACT || "false",
  OWNER_REACT: process.env.OWNER_REACT || "false",
  CUSTOM_REACT: process.env.CUSTOM_REACT || "false",
  CUSTOM_REACT_EMOJIS: getConfig("CUSTOM_REACT_EMOJIS") || process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
  STICKER_NAME: process.env.STICKER_NAME || "Gimaa-ᴍᴅ",
  AUTO_STICKER: process.env.AUTO_STICKER || "false",

  // ===== MEDIA & AUTOMATION =====
  AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
  AUTO_TYPING: process.env.AUTO_TYPING || "false",
  MENTION_REPLY: process.env.MENTION_REPLY || "false",
  MENU_IMAGE_URL: getConfig("MENU_IMAGE_URL") || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",

  // ===== SECURITY & ANTI-FEATURES =====
  ANTI_DELETE: process.env.ANTI_DELETE || "true",
  ANTI_CALL: process.env.ANTI_CALL || "false",
  ANTI_BAD_WORD: process.env.ANTI_BAD_WORD || "false",
  ANTI_LINK: process.env.ANTI_LINK || "true",
  ANTI_VV: process.env.ANTI_VV || "true",
  DELETE_LINKS: process.env.DELETE_LINKS || "false",
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
  ANTI_BOT: process.env.ANTI_BOT || "true",
  PM_BLOCKER: process.env.PM_BLOCKER || "true",

  // ===== BOT BEHAVIOR & APPEARANCE =====
  DESCRIPTION: process.env.DESCRIPTION || "> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥",
  PUBLIC_MODE: process.env.PUBLIC_MODE || "true",
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
  AUTO_BIO: process.env.AUTO_BIO || "false",
  WELCOME: process.env.WELCOME || "false",
  GOODBYE: process.env.GOODBYE || "false",
  ADMIN_ACTION: process.env.ADMIN_ACTION || "false",
  version: process.env.version || "1.0.2",

  // ===== CATEGORY-SPECIFIC IMAGE URLs =====
  MENU_IMAGES: {
    '1': process.env.DOWNLOAD_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg", // Download Menu
    '2': process.env.GROUP_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",   // Group Menu
    '3': process.env.FUN_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",       // Fun Menu
    '4': process.env.OWNER_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",   // Owner Menu
    '5': process.env.AI_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",         // AI Menu
    '6': process.env.ANIME_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",   // Anime Menu
    '7': process.env.CONVERT_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg", // Convert Menu
    '8': process.env.OTHER_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",   // Other Menu
    '9': process.env.REACTION_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg", // Reaction Menu
    '10': process.env.MAIN_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",    // Main Menu
    '11': process.env.LOGO_MAKER_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg", // Logo Maker Menu
    '12': process.env.SETTINGS_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg", // Settings Menu
    '13': process.env.AUDIO_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",  // Audio Menu
    '14': process.env.PRIVACY_MENU_IMAGE || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg" // Privacy Menu
  }
};

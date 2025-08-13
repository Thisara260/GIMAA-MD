const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "avYT2YbZ#ukCAwFFF5AZv7hm45iYPvScJdnSqY2iHcFaJgXAy6Ss",
  OWNER_NUM: process.env.OWNER_NUM || "94704198014",
  PREFIX: process.env.PREFIX || ".", 
  ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/Qxg4wQP/shaban-md.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "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"
};

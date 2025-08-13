const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "S6xG1JjS#Rc5ulILriENLbQOyKuSgGS0F7Lw2JGe4wmfCuUwwefE",
  OWNER_NUM: process.env.OWNER_NUM || "94704198014",
  PREFIX: process.env.PREFIX || ".", 
  ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/x8hP1DR4/shaban-md.jpg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n> > 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥",
  MODE: process.env.MODE || "public",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "true",
  AUTO_REPLY: process.env.AUTO_REPLY || "true"
};

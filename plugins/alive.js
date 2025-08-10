const {cmd , commands} = require('../command')
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["bot"] ,
    react: "👻" ,
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(robin, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await robin.sendPresenceUpdate('recording', from);
    await robin.sendMessage(from, { audio: { url: "https://github.com/ROBIN-MAX-YT/BOT-HELPER/raw/refs/heads/main/audio/Owner.mp3" }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    await robin.sendMessage(from,{sticker: { url : "https://th.bing.com/th/id/R.e69b65dabca591c4bbe140a32f520682?rik=g48oRqfhchLIPA&pid=ImgRaw&r=0" },package: ' 𝛲𝛩𝑊𝛯𝑅𝐷 𝐵𝑌 ＧIᗰ𝛥𝛥'},{ quoted: mek })
return await robin.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
    
}catch(e){
console.log(e)
reply(`${e}`)
}
})


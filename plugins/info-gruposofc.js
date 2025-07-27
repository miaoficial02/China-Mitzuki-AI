const handler = async (m, { conn, usedPrefix, command }) => {
  const texto = `
🌐 𝐆𝐑𝐔𝐏𝐎 𝐎𝐅𝐈𝐂𝐈𝐀𝐋 𝐗𝐙𝐘 𝐑𝐔𝐊𝐈𝐀-𝐁𝐎𝐓

✨ Únete a nuestra comunidad, comparte ideas, reporta errores, o simplemente charla con otros usuarios. ¡Eres bienvenido!

1️⃣  𝙂𝙧𝙪𝙥𝙤 𝙊𝙛𝙞𝙘𝙞𝙖𝙡 𝘿𝙚 𝙍𝙪𝙠𝙞𝙖 (𝘾𝙚𝙧𝙤 𝙎𝙪𝙗𝘽𝙤𝙩)  
https://chat.whatsapp.com/BwoPmcZVruTH2hjYyvoEs5?mode=ac_t

⚠️ Respeta las normas de cada grupo.

─
📌 Usa .menu Para Ver la Lista De Comando By Rokixzy
`

  await conn.sendMessage(m.chat, {
    text: texto.trim(),
    contextInfo: {
      externalAdReply: {
        title: "𝐑𝐮𝐤𝐢𝐚𝐗𝐳𝐲𝐕2",
        body: "𝐔𝐧𝐞𝐭𝐞 𝐀 𝐋𝐨𝐬 𝐆𝐫𝐮𝐩𝐨𝐬 𝐎𝐟𝐢𝐜𝐢𝐚𝐥𝐞𝐬 𝐃𝐞 𝐑𝐮𝐤𝐢𝐚",
        thumbnailUrl: 'https://files.catbox.moe/1w8sut.jpeg', // Puedes cambiar la imagen
        sourceUrl: "https://github.com/El-brayan502/NyanCatBot-MD",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = /^grupos$/i

export default handler
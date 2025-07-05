/*
Código embellecido por Carlos
 https://github.com/Kone457/Shizuka-AI 
*/

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender)

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  let str =
    who === m.sender
      ? `╭──〔 👏 𝘼𝙥𝙡𝙖𝙪𝙨𝙤 𝘼𝙣𝙞𝙢𝙖𝙙𝙤 〕──╮\n` +
        `┃ ${name2} se está aplaudiendo solit@ ✨ \n` +
        `╰────────────────────────╯`
      : `╭──〔 🎉 𝘽𝙧𝙖𝙫𝙤 𝙗𝙞𝙚𝙣 𝙢𝙚𝙧𝙚𝙘𝙞𝙙𝙤 〕──╮\n` +
        `┃ ${name2} está aplaudiendo por ${name} 👏 \n` +
        `╰────────────────────────────╯`

  // Firma personalizada
  const firma = '\n\n— ✦ Código embellecido por Carlos ✦\n✧ github.com/Kone457/Shizuka-AI'
  str += firma

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783949630.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783943462.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783939563.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783934953.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783932650.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783972646.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783967998.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783963108.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783958237.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783953678.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783977470.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783983378.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783987612.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783995547.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745783999582.mp4'
    ]

    const video = videos[Math.floor(Math.random() * videos.length)]

    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        gifPlayback: true,
        caption: str,
        mentions: [who]
      },
      { quoted: m }
    )
  }
}

handler.help = ['clap']
handler.tags = ['anime']
handler.command = ['clap', 'aplaudir']
handler.group = true

export default handler
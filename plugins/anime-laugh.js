/*───────────────────────────────────────
  📁 Módulo:     laugh.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

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
      ? `╭──〔 😄 RISA SOLITARIA 〕──╮\n` +
        `┃ ${name2} se está riendo alegremente\n` +
        `╰────────────────────────────╯`
      : `╭──〔 😂 RISA COMPARTIDA 〕──╮\n` +
        `┃ ${name2} se está riendo de ${name}\n` +
        `╰───────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786374608.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786369083.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786361805.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786354536.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786351095.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786397653.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786392661.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786387772.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786382983.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786379391.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786447115.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786417093.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786411517.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786407051.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745786402130.mp4'
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

handler.help = ['laugh']
handler.tags = ['anime']
handler.command = ['laugh', 'reirse']
handler.group = true

export default handler
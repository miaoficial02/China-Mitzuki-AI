/*───────────────────────────────────────
  📁 Módulo:     facepalm.js
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
      ? `╭──〔 🤦‍ FACEPALM EXPRESSIVO 〕──╮\n` +
        `┃ ${name2} se da una palmada en la cara\n` +
        `╰─────────────────────────────────╯`
      : `╭──〔 🤷‍♂️ POR LAS LOCURAS DE OTROS 〕──╮\n` +
        `┃ ${name2} se da una palmada por las tonterías de ${name}\n` +
        `╰──────────────────────────────────────╯`

  const firma = '\n\n— ✦ Código embellecido por Carlos ✦\n✧ github.com/Kone457/Shizuka-AI'
  str += firma

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864486946.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864475871.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864518724.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864512181.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864505137.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864499616.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864494866.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864551167.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864556219.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864541815.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864530827.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742864525491.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603117511.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603121055.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745603117511.mp4'
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

handler.help = ['facepalm']
handler.tags = ['anime']
handler.command = ['facepalm', 'palmada']
handler.group = true

export default handler
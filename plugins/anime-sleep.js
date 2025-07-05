/*───────────────────────────────────────
  📁 Módulo:     sleep.js
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
      ? `╭──〔 💤 SIESTA REPARADORA 〕──╮\n` +
        `┃ ${name2} está tomando una siesta\n` +
        `╰──────────────────────────────╯`
      : `╭──〔 🛏️ DULCES SUEÑOS COMPARTIDOS 〕──╮\n` +
        `┃ ${name2} está durmiendo con ${name}\n` +
        `╰──────────────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/0684477ff198a678d4821.mp4', 
      'https://telegra.ph/file/583b7a7322fd6722751b5.mp4', 
      'https://telegra.ph/file/e6ff46f4796c57f2235bd.mp4',
      'https://telegra.ph/file/06b4469cd5974cf4e28ff.mp4',
      'https://telegra.ph/file/9213f74b91f8a96c43922.mp4',
      'https://telegra.ph/file/b93da0c01981f17c05858.mp4',
      'https://telegra.ph/file/8e0b0fe1d653d6956608a.mp4',
      'https://telegra.ph/file/3b091f28e5f52bc774449.mp4',
      'https://telegra.ph/file/7c795529b38d1a93395f6.mp4',
      'https://telegra.ph/file/6b8e6cc26de052d4018ba.mp4'
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

handler.help = ['sleep @tag', 'dormir @usuario']
handler.tags = ['anime']
handler.command = ['sleep', 'dormir']
handler.group = true

export default handler
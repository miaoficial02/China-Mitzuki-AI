/*───────────────────────────────────────
  📁 Módulo:     shy.js
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
      ? `╭──〔 🙈 TIMIDEZ A FLOR DE PIEL 〕──╮\n` +
        `┃ ${name2} está muy timid@\n` +
        `╰──────────────────────────────────╯`
      : `╭──〔 😳 NERVIOS JUVENILES 〕──╮\n` +
        `┃ ${name2} está timid@ por ${name}\n` +
        `╰───────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/a9ccfa5013d58fad2e677.mp4',
      'https://telegra.ph/file/2cd355afa143095b97890.mp4',
      'https://telegra.ph/file/362c8566dc9367a5a473d.mp4',
      'https://telegra.ph/file/4f9323ca22e126b9d275c.mp4',
      'https://telegra.ph/file/51b688e0c5295bc37ca92.mp4',
      'https://telegra.ph/file/dfe74d7eee02c170f6f55.mp4',
      'https://telegra.ph/file/697719af0e6f3baec4b2f.mp4',
      'https://telegra.ph/file/89e1e1e44010975268b38.mp4',
      'https://telegra.ph/file/654313ad5a3e8b43fc535.mp4'
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

handler.help = ['shy @tag', 'timida @usuario']
handler.tags = ['anime']
handler.command = ['shy', 'timida']
handler.group = true

export default handler
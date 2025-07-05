/*───────────────────────────────────────
  📁 Módulo:     smoke.js
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
      ? `╭──〔 🌫️ MOMENTO DE RELAJO 〕──╮\n` +
        `┃ ${name2} está fumando tranquilamente\n` +
        `╰────────────────────────────────╯`
      : `╭──〔 🚬 ESCENA COMPARTIDA 〕──╮\n` +
        `┃ ${name2} está fumando con ${name}\n` +
        `╰──────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://qu.ax/GRoUp.mp4', 
      'https://qu.ax/ecCLK.mp4', 
      'https://qu.ax/MJBNo.mp4',
      'https://qu.ax/HLTOu.mp4',
      'https://qu.ax/BzTUE.mp4',
      'https://qu.ax/UNRMc.mp4',
      'https://qu.ax/KraLy.mp4',
      'https://qu.ax/UKxHy.mp4'
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

handler.help = ['smoke', 'fumar']
handler.tags = ['anime']
handler.command = ['smoke', 'fumar']
handler.group = true

export default handler
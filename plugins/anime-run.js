/*───────────────────────────────────────
  📁 Módulo:     run.js
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
      ? `╭──〔 🏃‍♂️ CARRERA SOLITARIA 〕──╮\n` +
        `┃ ${name2} está corriendo sin destino claro\n` +
        `╰────────────────────────────────╯`
      : `╭──〔 🏃‍♀️ HUIDA ESTRATÉGICA 〕──╮\n` +
        `┃ ${name2} está huyendo de ${name}\n` +
        `╰───────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://qu.ax/acRFf.mp4',
      'https://qu.ax/iUjgV.mp4',
      'https://qu.ax/wjheu.mp4',
      'https://qu.ax/ejZJD.mp4',
      'https://qu.ax/UOLym.mp4',
      'https://qu.ax/qTAxM.mp4',
      'https://qu.ax/oCYed.mp4',
      'https://qu.ax/OPMAT.mp4'
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

handler.help = ['run', 'correr']
handler.tags = ['anime']
handler.command = ['run', 'correr']
handler.group = true

export default handler
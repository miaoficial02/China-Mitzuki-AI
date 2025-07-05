/*───────────────────────────────────────
  📁 Módulo:     preg.js
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
      ? `╭──〔 🍼 SORPRESA BIÓLOGICA 〕──╮\n` +
        `┃ ${name2} se embarazó a sí mism@\n` +
        `╰──────────────────────────────╯`
      : `╭──〔 🤰 ACCIDENTE EVITABLE? 〕──╮\n` +
        `┃ ${name2} embarazó a ${name}\n` +
        `╰────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://qu.ax/uaYcl.mp4',
      'https://qu.ax/JqiKb.mp4',
      'https://qu.ax/uVokC.mp4',
      'https://qu.ax/NrcsJ.mp4',
      'https://qu.ax/hTGUg.mp4',
      'https://files.catbox.moe/brnwzh.mp4',
      'https://files.catbox.moe/3ucfc0.mp4',
      'https://files.catbox.moe/054z2h.mp4'
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

handler.help = ['preg @tag', 'embarazar', 'preñar']
handler.tags = ['anime']
handler.command = ['preg', 'embarazar', 'preñar']
handler.group = true

export default handler
/*───────────────────────────────────────
  📁 Módulo:     pat.js
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
      ? `╭──〔 🤲 MIMO PERSONAL 〕──╮\n` +
        `┃ ${name2} se acarició con ternura\n` +
        `╰────────────────────────────╯`
      : `╭──〔 🫰 GESTO DE CARIÑO 〕──╮\n` +
        `┃ ${name2} acarició a ${name}\n` +
        `╰────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/f75aed769492814d68016.mp4',
      'https://telegra.ph/file/4f24bb58fe580a5e97b0a.mp4',
      'https://telegra.ph/file/30206abdcb7b8a4638510.mp4',
      'https://telegra.ph/file/ecd7aeae5b2242c660d41.mp4',
      'https://telegra.ph/file/6d3ba201bcdd1fd2c1408.mp4',
      'https://telegra.ph/file/d5dbdcf845d2739dbe45e.mp4',
      'https://telegra.ph/file/c9a529908d4e0b71d7c5a.mp4',
      'https://telegra.ph/file/b7bc277ddef1af913827c.mp4',
      'https://telegra.ph/file/8b01e180dfb7e98d5a4f8.mp4',
      'https://telegra.ph/file/901f13852aa65f9628d96.mp4'
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

handler.help = ['pat @tag', 'acariciar @usuario']
handler.tags = ['anime']
handler.command = ['pat', 'acariciar']
handler.group = true

export default handler
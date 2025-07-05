/*───────────────────────────────────────
  📁 Módulo:     slap.js
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
      ? `╭──〔 🫢 AUTOBOFETADA 〕──╮\n` +
        `┃ ${name2} se dio una bofetada a sí mism@\n` +
        `╰─────────────────────────────╯`
      : `╭──〔 🙃 GESTO EXPLOSIVO 〕──╮\n` +
        `┃ ${name2} le dio una bofetada a ${name}\n` +
        `╰────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/3ba192c3806b097632d3f.mp4',
      'https://telegra.ph/file/58b33c082a81f761bbee8.mp4',
      'https://telegra.ph/file/da5011a1c504946832c81.mp4',
      'https://telegra.ph/file/20ac5be925e6cd48f549f.mp4',
      'https://telegra.ph/file/a00bc137b0beeec056b04.mp4',
      'https://telegra.ph/file/080f08d0faa15119621fe.mp4',
      'https://telegra.ph/file/eb0b010b2f249dd189d06.mp4',
      'https://telegra.ph/file/734cb1e4416d80a299dac.mp4',
      'https://telegra.ph/file/fc494a26b4e46c9b147d2.mp4'
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

handler.help = ['slap', 'bofetada']
handler.tags = ['anime']
handler.command = ['slap', 'bofetada']
handler.group = true

export default handler
/*───────────────────────────────────────
  📁 Módulo:     sad.js
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
      ? `╭──〔 😞 TRISTEZA INTERIOR 〕──╮\n` +
        `┃ ${name2} está muy triste\n` +
        `╰────────────────────────────╯`
      : `╭──〔 💔 DUELO EMOCIONAL 〕──╮\n` +
        `┃ ${name2} está triste por ${name}\n` +
        `╰────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/9c69837650993b40113dc.mp4',
      'https://telegra.ph/file/071f2b8d26bca81578dd0.mp4',
      'https://telegra.ph/file/0af82e78c57f7178a333b.mp4',
      'https://telegra.ph/file/8fb8739072537a63f8aee.mp4',
      'https://telegra.ph/file/4f81cb97f31ce497c3a81.mp4',
      'https://telegra.ph/file/6d626e72747e0c71eb920.mp4',
      'https://telegra.ph/file/8fd1816d52cf402694435.mp4',
      'https://telegra.ph/file/3e940fb5e2b2277dc754b.mp4'
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

handler.help = ['sad @tag', 'triste @usuario']
handler.tags = ['anime']
handler.command = ['sad', 'triste']
handler.group = true

export default handler
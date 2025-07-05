/*
 Código embellecido por Carlos
 https://github.com/Kone457/Shizuka-AI 
*/

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
      ? `╭──〔 😔 TRISTEZA INTERIOR 〕──╮\n` +
        `┃ ${name2} está llorando a solas\n` +
        `╰────────────────────────────╯`
      : `╭──〔 💧 LÁGRIMAS EN EL GRUPO 〕──╮\n` +
        `┃ ${name2} está llorando por ${name}\n` +
        `╰──────────────────────────────╯`

  
  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848091425.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848085362.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848079587.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848073172.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742847881454.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848152702.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848141444.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848132661.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848123105.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848107542.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848315415.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742848218445.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602120353.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602123977.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745602128279.mp4'
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

handler.help = ['cry']
handler.tags = ['anime']
handler.command = ['cry', 'llorar']
handler.group = true

export default handler
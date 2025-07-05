/*───────────────────────────────────────
  📁 Módulo:     hello.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : m.quoted
      ? m.quoted.sender
      : m.sender

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  await m.react('👋')

  let str =
    m.mentionedJid.length > 0
      ? `╭──〔 💬 SALUDO PERSONALIZADO 〕──╮\n` +
        `┃ ${name2} saluda a ${name}: ¿cómo estás?\n` +
        `╰─────────────────────────────╯`
      : m.quoted
        ? `╭──〔 👋 SALUDO DIRECTO 〕──╮\n` +
          `┃ ${name2} te pregunta, ${name}: ¿cómo te encuentras hoy?\n` +
          `╰────────────────────────────╯`
        : `╭──〔 🌟 SALUDO GENERAL 〕──╮\n` +
          `┃ ${name2} saluda a todo el grupo: ¡espero que estén bien!\n` +
          `╰───────────────────────────╯`

  

  if (m.isGroup) {
    const videos = [
      'https://qu.ax/EcRBE.mp4',
      'https://qu.ax/oARle.mp4',
      'https://qu.ax/eQXQh.mp4',
      'https://qu.ax/ddLrC.mp4',
      'https://qu.ax/oalOG.mp4',
      'https://qu.ax/nYJ.mp4',
      'https://qu.ax/bkcz.mp4',
      'https://qu.ax/oARle.mp4'
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

handler.help = ['hello @tag', 'hola @etiqueta']
handler.tags = ['anime']
handler.command = ['hello', 'hola']
handler.group = true

export default handler
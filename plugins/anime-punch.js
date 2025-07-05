/*───────────────────────────────────────
  📁 Módulo:     punch.js
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
      ? `╭──〔 🥊 AUTOGOLPE CRÍTICO 〕──╮\n` +
        `┃ ${name2} se golpeó con fuerza\n` +
        `╰────────────────────────────╯`
      : `╭──〔 👊 GOLPE IMPULSIVO 〕──╮\n` +
        `┃ ${name2} le dio un puñetazo a ${name}\n` +
        `╰────────────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/8e60a6379c1b72e4fbe0f.mp4',
      'https://telegra.ph/file/8ac9ca359cac4c8786194.mp4',
      'https://telegra.ph/file/cc20935de6993dd391af1.mp4',
      'https://telegra.ph/file/9c0bba4c6b71979e56f55.mp4',
      'https://telegra.ph/file/5d22649b472e539f27df9.mp4',
      'https://telegra.ph/file/804eada656f96a04ebae8.mp4',
      'https://telegra.ph/file/3a2ef7a12eecbb6d6df53.mp4',
      'https://telegra.ph/file/c4c27701496fec28d6f8a.mp4',
      'https://telegra.ph/file/c8e5a210a3a34e23391ee.mp4',
      'https://telegra.ph/file/70bac5a760539efad5aad.mp4'
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

handler.help = ['punch', 'pegar', 'golpear']
handler.tags = ['anime']
handler.command = ['punch', 'pegar', 'golpear']
handler.group = true

export default handler
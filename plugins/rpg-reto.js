/*───────────────────────────────────────
  📁 Módulo:     reto.js
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

  const retos = [
    'Confiesa tu crush del grupo 😏',
    'Envía el último sticker que guardaste 👀',
    'Escribe un mensaje sin usar vocales 😂',
    'Usa solo emojis por 10 minutos 😶',
    'Hazle una declaración dramática a alguien ✨',
    'Cuenta tu momento más vergonzoso 🤦',
    'Cambia tu estado por “Soy un🥔” por 1 hora 🥔',
    'Invéntate una canción en voz alta 🎤',
    'Muestra tu fondo de pantalla 📱'
  ]

  let reto = retos[Math.floor(Math.random() * retos.length)]

  let str =
    who === m.sender
      ? `╭──〔 🎭 AUTORETO 〕──╮\n` +
        `┃ ${name2}, tu reto es:\n┃ ${reto}\n` +
        `╰────────────────────╯`
      : `╭──〔 🤝 RETO ACTIVADO 〕──╮\n` +
        `┃ ${name2} ha retado a ${name}\n┃ Reto: ${reto}\n` +
        `╰────────────────────────╯`

  if (m.isGroup) {
    await conn.sendMessage(
      m.chat,
      {
        text: str,
        mentions: [who]
      },
      { quoted: m }
    )
  }
}

handler.help = ['reto']
handler.tags = ['fun']
handler.command = ['reto']
handler.group = true

export default handler
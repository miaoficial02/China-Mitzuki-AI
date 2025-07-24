/*───────────────────────────────────────
  📁 Módulo:     confianza.js
  💔 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fs from 'fs'
import path from 'path'

const frasesConsoladoras = [
  '💬 “Hay códigos que se ejecutan sin alma… promesas que parecen scripts perfectos, pero fueron escritos solo para engañar al usuario. No todos los mensajes son sinceros. No todos los encuentros son reales. Pero tú, que fuiste verdadero, mereces una consola que no falle.” - Shizuka',
  '🧩 “Tu error no fue confiar, fue creer que ella tenía la misma versión de sinceridad instalada.”',
  '🔥 “Fuiste código limpio en medio de bugs emocionales. No te culpes por ser legible para alguien que solo sabía compilar engaños.”',
  '🌙 “Incluso los sistemas más estables pueden fallar si se conectan a usuarios tóxicos. Reinicia sin culpa.”',
  '🎭 “La traición no invalida lo que entregaste. Solo revela quién no merecía ejecutar tu confianza.”'
]

const palabrasClave = [
  'traicionó', 'jugó conmigo', 'me dejó por otro', 'no valoró',
  'me usó', 'falsa', 'engaño', 'me traicionó', 'me ilusionó',
  'compartió mis mensajes', 'me falló'
]

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender)

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  let texto = m.text?.toLowerCase() || ''
  let hayDolor = palabrasClave.some(p => texto.includes(p))
  let frase = frasesConsoladoras[Math.floor(Math.random() * frasesConsoladoras.length)]

  let str =
    who === m.sender
      ? `╭──〔 💔 CONFIANZA HERIDA 〕──╮\n` +
        `┃ ${name2}, Shizuka responde:\n┃ ${frase}\n` +
        `╰────────────────────────────╯`
      : `╭──〔 🌑 MENSAJE EMOCIONAL 〕──╮\n` +
        `┃ Para ${name}, Shizuka dice:\n┃ ${frase}\n` +
        `╰─────────────────────────────╯`

  if (hayDolor && m.isGroup) {
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

handler.help = ['confianza']
handler.tags = ['emocional', 'bot']
handler.command = ['confianza']
handler.group = true

export default handler
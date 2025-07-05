/*───────────────────────────────────────
  📁 Módulo:     waifu.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    const emoji = '🌸'
    await m.react(emoji)
    await conn.reply(m.chat, `${emoji} Buscando tu *Waifu*...`, m)

    const res = await fetch('https://api.waifu.pics/sfw/waifu')
    if (!res.ok) throw await res.text()

    const json = await res.json()
    if (!json.url) throw 'No se pudo obtener la imagen.'

    await conn.sendFile(
      m.chat,
      json.url,
      'waifu.jpg',
      `${emoji} Aquí tienes tu *Waifu* ✧˚₊‧₊˚`,
      m
    )
  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '⚠️ Ocurrió un error al obtener la Waifu.', m)
  }
}

handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']
handler.group = true

export default handler
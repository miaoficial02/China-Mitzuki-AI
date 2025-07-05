/*───────────────────────────────────────
  📁 Módulo:     ppcouple.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  // Obtener JSON con URLs de imágenes de pareja
  const res = await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')
  const data = await res.json()
  const cita = data[Math.floor(Math.random() * data.length)]

  // Descargar y enviar imagen masculina
  const masculino = await (await fetch(cita.cowo)).buffer()
  await conn.sendFile(m.chat, masculino, 'cowo.jpg', '*Masculino* ♂️', m)

  // Descargar y enviar imagen femenina
  const femenino = await (await fetch(cita.cewe)).buffer()
  await conn.sendFile(m.chat, femenino, 'cewe.jpg', '*Femenina* ♀️', m)
}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = ['ppcp', 'ppcouple']
handler.limit = false
handler.register = true

export default handler
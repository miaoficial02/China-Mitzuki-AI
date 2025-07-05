/*───────────────────────────────────────
  📁 Módulo:     fixmsgespera.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import { promises as fs } from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  // Configuración básica
  const emoji = '✅'
  const emoji2 = '🧼'
  const emojiErr = '⚠️'
  const botname = global.botname || 'Shizuka-AI'
  const channel = global.channel || 'https://whatsapp.com/channel/XXXXXXXXXXXX'
  const sessions = 'sessions' // nombre de tu carpeta de sesiones
  const sessionPath = `./${sessions}/`

  // Permitir solo desde el número principal del bot
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, `${emojiErr} Este comando solo puede ejecutarse desde el *número principal del bot*.`, m)
  }

  const chatIds = m.isGroup ? [m.chat, m.sender] : [m.sender]

  try {
    const files = await fs.readdir(sessionPath)
    let eliminados = 0

    for (const file of files) {
      for (const id of chatIds) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file))
          eliminados++
          break
        }
      }
    }

    if (eliminados === 0) {
      await conn.reply(m.chat, `${emoji2} No se encontró ningún archivo asociado a esta sesión.`, m)
    } else {
      await conn.reply(m.chat, `${emoji2} Se eliminaron *${eliminados} archivos de sesión*.`, m)
      await conn.reply(m.chat, `${emoji} ¡Hola! ¿puedes verme ahora sin problemas?`, m)
    }
  } catch (err) {
    console.error('[❌] Error al procesar archivos de sesión:', err)
    await conn.reply(
      m.chat,
      `${emojiErr} Se produjo un error al acceder a la carpeta de sesiones.\n` +
      `🔧 Verifica que *./${sessions}/* exista y tenga permisos.\n\n` +
      `💬 *${botname}* agradece tu apoyo 💖\n📣 ${channel}`,
      m
    )
  }
}

handler.help = ['fixmsgespera', 'ds']
handler.tags = ['info']
handler.command = ['fixmsgespera', 'ds']
handler.register = true

export default handler
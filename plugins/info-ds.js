/*───────────────────────────────────────
  📁 Módulo:     fixmsgespera.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs'
import path from 'path'

const handler = async (m, { conn }) => {
  const sessions = 'sessions'
  const sessionPath = `./${sessions}/`
  const emoji = '✅'
  const emoji2 = '🧼'
  const emojiErr = '⚠️'
  const botname = global.botname || 'Shizuka-AI'
  const channel = global.channel || 'https://whatsapp.com/channel/XXXXX'

  // Solo desde el número principal del bot
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, `${emojiErr} *Este comando solo puede ejecutarse desde el número principal del Bot.*`, m)
  }

  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender]

  try {
    const files = await fs.readdir(sessionPath)
    let filesDeleted = 0

    for (let file of files) {
      for (let id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file))
          filesDeleted++
          break
        }
      }
    }

    if (filesDeleted === 0) {
      await conn.reply(m.chat, `${emoji2} *No se encontró ningún archivo asociado a esta sesión.*`, m)
    } else {
      await conn.reply(m.chat, `${emoji2} *Se eliminaron ${filesDeleted} archivos de sesión.*`, m)
      await conn.reply(m.chat, `${emoji} *¡Hola! ¿logras verme correctamente ahora?*`, m)
    }

  } catch (err) {
    console.error('[🧨] Error al procesar sesiones:', err)
    await conn.reply(
      m.chat,
      `${emojiErr} *Ocurrió un error al acceder a las sesiones.*\n` +
      `🔧 Asegúrate de que la carpeta *./${sessions}/* exista.\n\n` +
      `🤖 *${botname}* agradece tu apoyo:\n${channel}`,
      m
    )
  }
}

handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = ['fixmsgespera', 'ds']
handler.register = true

export default handler
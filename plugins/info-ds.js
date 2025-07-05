/*───────────────────────────────────────
  📁 Módulo:     fixmsgespera.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import { promises as fs } from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  const sessionsFolder = './sessions/' // Asegúrate que esta ruta sea correcta y accesible
  const emojiOk = '✅'
  const emojiWarn = '⚠️'
  const emojiBot = '💬'
  const botName = global.botname || 'Shizuka-AI'
  const canal = global.channel || 'https://whatsapp.com/channel/XXXXXXXXXXXX'

  // Solo ejecutable desde el número principal
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.reply(m.chat, `${emojiWarn} Este comando solo puede ejecutarse desde el *número principal del bot*.`, m)
  }

  const chatIds = m.isGroup ? [m.chat, m.sender] : [m.sender]

  try {
    const files = await fs.readdir(sessionsFolder)
    let eliminados = 0

    for (let file of files) {
      for (let id of chatIds) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionsFolder, file))
          eliminados++
          break
        }
      }
    }

    if (eliminados === 0) {
      await conn.reply(m.chat, `${emojiWarn} No se encontró ningún archivo asociado a esta sesión.`, m)
    } else {
      await conn.reply(m.chat, `${emojiOk} Se eliminaron *${eliminados} archivos de sesión* asociados.`, m)
      await conn.reply(m.chat, `${emojiBot} ¡Hola! ¿logras verme correctamente ahora?`, m)
    }
  } catch (err) {
    console.error('[🧨] Error al procesar archivos de sesión:', err)
    await conn.reply(m.chat, `${emojiWarn} Se produjo un error. Asegúrate de tener permisos suficientes o de que la carpeta *sessions* exista.\n\n*${botName}* agradece tu apoyo 🙌\n${canal}`, m)
  }
}

handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = ['fixmsgespera', 'ds']
handler.register = true

export default handler
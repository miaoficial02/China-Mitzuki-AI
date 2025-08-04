/*───────────────────────────────────────
  📁 Módulo:     fixmsgespera.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

let handler = async (m, { conn, usedPrefix }) => {
    if (global.conn.user.jid !== conn.user.jid) {
        return conn.reply(m.chat, `🚫 *Este comando solo puede usarse desde el número principal de Rukia.*`, m)
    }

    let chatId = m.isGroup ? [m.chat, m.sender] : [m.sender]
    let sessionPath = `./${sessions}/`
    let filesDeleted = 0

    try {
        let files = await fs.readdir(sessionPath)

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
            await conn.reply(m.chat, `🌸 *No encontré ningún archivo de sesión relacionado con este chat.*`, m)
        } else {
            await conn.reply(m.chat, `📂 *Rukia ha eliminado con éxito ${filesDeleted} fragmentos de sesión que bloqueaban tu conexión.*`, m)
            await conn.reply(m.chat, `❄️ *He regresado... ¿me percibes con mayor claridad ahora?*`, m)
        }

    } catch (err) {
        console.error('⚠️ Error en la limpieza de sesión:', err)
        await conn.reply(m.chat, `🌙 *Soy Rukia, y parece que ocurrió un error inesperado.*\n🔔 *Apóyanos y sigue nuestro canal:*\n> ${channel}`, m)
    }
}

handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = ['fixmsgespera', 'ds']
handler.register = true

export default handler
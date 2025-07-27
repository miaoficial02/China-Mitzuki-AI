import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  await m.reply(`🔄 *Rukia está iniciando el proceso de actualización...*`)

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(
        m.chat,
        `🌀 *Error detectado durante la actualización.*\n\n📎 Detalle técnico:\n${err.message}`,
        m
      )
      return
    }

    if (stderr) {
      console.warn('🌨️ Advertencia durante la actualización:', stderr)
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `🥷🏻 *Todo Listo.*\n✨ *Rukia ya está actualizada.*`, m)
    } else {
      conn.reply(
        m.chat,
        `❄️ *Actualización completada con éxito.*\n\n✅ *Detalles del proceso:*\n${stdout}`,
        m
      )
    }
  })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update']
handler.rowner = true

export default handler
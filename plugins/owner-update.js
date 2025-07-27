import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  await m.reply(`🌨️ 𝐀𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐧𝐝𝐨 𝐋𝐚 𝐍𝐢𝐞𝐛𝐥𝐚 𝐃𝐞𝐥 𝐈𝐧𝐟𝐢𝐧𝐢𝐭𝐨 ↻`)

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(
        m.chat,
        ` 𝐄𝐫𝐫𝐨𝐫 𝐀𝐥 𝐀𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐫 𝐋𝐚 𝐍𝐢𝐞𝐛𝐥𝐚 ❄️\n\n📎 Detalle técnico:\n${err.message}`,
        m
      )
      return
    }

    if (stderr) {
      console.warn('🌨️ Advertencia durante la actualización:', stderr)
    }

    if (stdout.includes('Already up to date.')) {
      conn.reply(m.chat, `💠 *𝐓𝐨𝐝𝐨 𝐁𝐢𝐞𝐧 𝐓𝐫𝐚𝐧𝐪𝐮𝐢*\n✨ 𝐘𝐚 𝐋𝐚 𝐍𝐢𝐞𝐛𝐥𝐚 𝐃𝐞𝐥 𝐈𝐧𝐟𝐢𝐧𝐢𝐭𝐨 𝐄𝐬𝐭𝐚 𝐀𝐜𝐭𝐮𝐚𝐥𝐢𝐳𝐚𝐝𝐚 ❄️`, m)
    } else {
      conn.reply(
        m.chat,
        `🌠 *Actualización con éxito.*\n\n❄️ *Detalles del proceso:*\n${stdout}`,
        m
      )
    }
  })
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'up']
handler.rowner = true

export default handler
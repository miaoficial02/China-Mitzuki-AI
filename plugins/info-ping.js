import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  const emoji = '📡'
  const emoji2 = '⚙️'
  const emoji3 = '✅'

  // ⏱️ Medir latencia
  let timestamp = speed()
  let latencia = speed() - timestamp

  // 🖥️ Ejecutar neofetch
  exec('neofetch --stdout', async (error, stdout, stderr) => {
    if (error) {
      await conn.sendMessage(m.chat, {
        react: { text: '❌', key: m.key }
      })
      return conn.reply(m.chat, `❌ *Error al obtener información del sistema.*`, m)
    }

    await conn.sendMessage(m.chat, {
      react: { text: '🏓', key: m.key }
    })

    let info = stdout.toString('utf-8').replace(/Memory:/, 'RAM:')
    let mensaje = `
╭━━━〔 ${emoji} *PONG DEL SISTEMA* 〕━━━╮
┃ ${emoji2} *Latencia:* ${latencia.toFixed(4)} ms
┃ ${emoji2} *Estado:* ${emoji3} Activo
┃ 
┃ *Información del sistema:*
┃ ${info.trim().split('\n').slice(0, 6).join('\n┃ ')}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()

    conn.reply(m.chat, mensaje, m)
  })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler

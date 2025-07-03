import speed from 'performance-now'
import { exec } from 'child_process'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latencia = speed() - timestamp

  exec(`neofetch --stdout`, async (error, stdout) => {
    if (error) {
      await conn.sendMessage(m.chat, {
        react: { text: '❌', key: m.key }
      })
      return conn.reply(m.chat, '❌ *Error al obtener información del sistema.*', m)
    }

    await conn.sendMessage(m.chat, {
      react: { text: '🏓', key: m.key }
    })

    let info = stdout.toString('utf-8').replace(/Memory:/, 'RAM:')
    let fragmentos = info.trim().split('\n').slice(0, 6).map(l => `┃ ${l}`)

    let mensaje = `
╭━━━〔 📡 *PING DEL SISTEMA* 〕━━━╮
┃ ⚙️ *Latencia:* ${latencia.toFixed(4)} ms
┃ 🧠 *Estado:* ✅ Activo y receptivo
┃ 
┃ 🖥️ *Sistema:*
${fragmentos.join('\n')}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()

    await conn.sendMessage(m.chat, {
      text: mensaje
    }, { quoted: m })
  })
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = ['ping', 'p']
handler.register = true

export default handler

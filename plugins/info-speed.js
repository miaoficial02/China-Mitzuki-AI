import { totalmem, freemem } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`
})

let handler = async (m, { conn }) => {
  let inicio = speed()
  let latencia = speed() - inicio

  let uptime = clockString(process.uptime() * 1000)

  let chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  let grupos = chats.filter(([jid, chat]) => jid.endsWith('@g.us') && !chat?.metadata?.read_only && !chat?.metadata?.announce)

  let texto = `
╭━━━〔 🛰️ 𝗗𝗜𝗔𝗚𝗡𝗢́𝗦𝗧𝗜𝗖𝗢 𝗥𝗨𝗞𝗜𝗔-𝗕𝗢𝗧 〕━━━╮
┃ ✦ *Velocidad de Respuesta:* ${latencia.toFixed(4)} ms
┃ ✦ *Tiempo Activo:* ${uptime}
┃ ✦ *Sesiones Activas:*
┃    ➤ ${chats.length} chats privados
┃    ➤ ${grupos.length} grupos
┃
┃ ✦ *Memoria RAM:*
┃    ➤ En uso: ${format(totalmem() - freemem())}
┃    ➤ Total:  ${format(totalmem())}
┃
┃ ✦ *Estado:* ✅ Rukia operando con eficiencia táctica.
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`.trim()

  await m.react('🧭')
  await conn.reply(m.chat, texto, m)
}

handler.help = ['speed']
handler.tags = ['info']
handler.command = ['speed']
handler.register = true

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
    let bot = global.db.data.settings[conn.user.jid]
    let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
    let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length

   let info = `╭━━━〔 📊 𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 ${global.botname.toUpperCase()} 〕━━━╮
┃ ✦ *Prefijo:* [ ${usedPrefix} ]
┃ ✦ *Plugins Activos:* ${totalf}
┃ ✦ *Comandos Usados:* ${toNum(totalStats)} ( ${totalStats} )
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n`

info += `╭━━━〔 💻 𝗗𝗔𝗧𝗢𝗦 𝗗𝗘𝗟 𝗛𝗢𝗦𝗧 〕━━━╮
┃ ✦ *Plataforma:* ${platform()}
┃ ✦ *Servidor:* ${hostname()}
┃ ✦ *RAM Usada:* ${format(totalmem() - freemem())} / ${format(totalmem())}
┃ ✦ *RAM Libre:* ${format(freemem())}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`

info += `╭━━━〔 🧠 𝗠𝗘𝗠𝗢𝗥𝗜𝗔 𝗡𝗢𝗗𝗘𝗝𝗦 〕━━━╮
` + Object.entries(process.memoryUsage()).map(([key, val]) => `┃ ✦ ${key}: ${format(val)}`).join('\n') + `
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n`

    await conn.reply(m.chat, info, fkontak, {
        contextInfo: {
            mentionedJid: [owner[0][0] + '@s.whatsapp.net']
        }
    })
}

handler.help = ['botinfo']
handler.tags = ['info']
handler.command = ['info', 'botinfo', 'infobot']

export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}
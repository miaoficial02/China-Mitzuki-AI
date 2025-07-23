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

    let info = `╭━━━┳┳┳┳┳┳━━━╮
┃✿  *𝕀𝕟𝕗𝕠𝕣𝕞𝕒𝕔𝕚𝕠́𝕟 𝕕𝕖 ${global.botname}*  ✿┃
╰━━━━━━━━━━━━━━━━╯\n`

    info += `╭─╼⃟🧩 *𝗘𝘀𝘁𝗮𝗱𝗼 𝗗𝗲𝗹 𝗕𝗼𝘁*\n`
    info += `┃ ✎ *Prefijo*: [ ${usedPrefix} ]\n`
    info += `┃ ✦ *Plugins Activos*: ${totalf}\n`
    info += `┃ ⚙ *Comandos Usados*: ${toNum(totalStats)} ( ${totalStats} )\n`
    info += `╰────────────────────╯\n\n`

    info += `╭─╼⃟💻 *𝗗𝗮𝘁𝗼𝘀 𝗗𝗲𝗹 𝗛𝗼𝘀𝘁*\n`
    info += `┃ 🪟 *Plataforma*: ${platform()}\n`
    info += `┃ 🖥️ *Servidor*: ${hostname()}\n`
    info += `┃ 🚀 *RAM Usada*: ${format(totalmem() - freemem())} / ${format(totalmem())}\n`
    info += `┃ 🧊 *RAM Libre*: ${format(freemem())}\n`
    info += `╰────────────────────╯\n\n`

    info += `╭─╼⃟🧠 *𝗠𝗲𝗺𝗼𝗿𝗶𝗮 𝗡𝗼𝗱𝗲𝗝𝗦*\n`
    info += '┃ ' + Object.keys(process.memoryUsage()).map((key) => `🔹 ${key}: ${format(process.memoryUsage()[key])}`).join('\n┃ ') + '\n'
    info += `╰────────────────────╯\n`

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
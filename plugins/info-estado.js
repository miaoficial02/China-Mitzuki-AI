import ws from 'ws'
let handler = async (m, { conn, usedPrefix, isRowner }) => {
    let _uptime = process.uptime() * 1000
    let totalreg = Object.keys(global.db.data.users).length
    let totalchats = Object.keys(global.db.data.chats).length

    let uptime = clockString(_uptime)
    let users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])]
    const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
    const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
    const totalUsers = users.length
    let old = performance.now()
    let neww = performance.now()
    let speed = neww - old
    const used = process.memoryUsage()

    let info = `╭━━━〔 ⚙️ 𝗘𝗦𝗧𝗔𝗗𝗢 𝗗𝗘 ${botname.toUpperCase()} 〕━━━╮\n`
info += `┃\n`
info += `┃ ✦ 🧑‍💻 𝗖𝗿𝗲𝗮𝗱𝗼𝗿: ${etiqueta}\n`
info += `┃ ✦ 💠 𝗣𝗿𝗲𝗳𝗶𝗷𝗼: [ ${usedPrefix} ]\n`
info += `┃ ✦ 🔰 𝗩𝗲𝗿𝘀𝗶𝗼́𝗻: ${vs}\n`
info += `┃\n`
info += `┃ ✦ 📩 𝗖𝗵𝗮𝘁𝘀 𝗽𝗿𝗶𝘃𝗮𝗱𝗼𝘀: ${chats.length - groupsIn.length}\n`
info += `┃ ✦ 🌐 𝗧𝗼𝘁𝗮𝗹 𝗱𝗲 𝗰𝗵𝗮𝘁𝘀: ${chats.length}\n`
info += `┃ ✦ 👥 𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝘀: ${totalreg}\n`
info += `┃ ✦ 🏘️ 𝗚𝗿𝘂𝗽𝗼𝘀 𝗮𝗰𝘁𝗶𝘃𝗼𝘀: ${groupsIn.length}\n`
info += `┃ ✦ ⏳ 𝗧𝗶𝗲𝗺𝗽𝗼 𝗲𝗻 𝗹í𝗻𝗲𝗮: ${uptime}\n`
info += `┃ ✦ 🚀 𝗩𝗲𝗹𝗼𝗰𝗶𝗱𝗮𝗱: ${(speed * 1000).toFixed(0) / 1000}s\n`
info += `┃ ✦ 🤖 𝗦𝘂𝗯𝗕𝗼𝘁𝘀 𝗮𝗰𝘁𝗶𝘃𝗼𝘀: ${totalUsers || '0'}\n`
info += `┃\n`
info += `╰━━━━━━━━━━━━━━━━━━━━━╯`

    await conn.sendFile(m.chat, avatar, 'estado.jpg', info, fkontak)
}

handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'estate', 'state', 'stado', 'stats']
handler.register = true

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}

let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = conn.getName(who)
    
    let str = `${name} lamió a alguien 👅`.trim()
    
    let lickGif = 'https://telegra.ph/file/c4970c4454a17fc68cb65.mp4'
    
    await conn.sendMessage(m.chat, { video: { url: lickGif }, gifPlayback: true, caption: str }, { quoted: m })
}

handler.help = ['lick']
handler.tags = ['fun']
handler.command = /^(lick|lamer)$/i

module.exports = handler

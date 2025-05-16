//Codígo creado por David Chian wa.me/5351524614

const handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = conn.getName(who)

    let str = `${name} agarró unas tetas 🤤`.trim()

    let tetasGif = 'https://telegra.ph/file/8c6b86bd8dfd9c3294984.mp4'

    await conn.sendMessage(m.chat, { video: { url: tetasGif }, gifPlayback: true, caption: str }, { quoted: m })
}

handler.help = ['agarrartetas']
handler.tags = ['fun']
handler.command = /^(agarrartetas|tetas)$/i

module.exports = handler
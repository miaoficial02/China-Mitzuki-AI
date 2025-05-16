//Codígo creado por David Chian wa.me/5351524614

const handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = conn.getName(who)

    let str = `${name} está chupando tetas 😳`.trim()

    let chuparGif = 'https://telegra.ph/file/a43449bc11fc8cc844c55.mp4'

    await conn.sendMessage(m.chat, { video: { url: chuparGif }, gifPlayback: true, caption: str }, { quoted: m })
}

handler.help = ['chupartetas']
handler.tags = ['fun']
handler.command = /^(chupartetas|chupat)$/i

module.exports = handler
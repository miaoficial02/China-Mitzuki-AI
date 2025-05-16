let handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = conn.getName(who)

    let str = `${name} hace pucheros 🥺`.trim()

    let poutGif = 'https://telegra.ph/file/e2a25adcb74689a58bcc6.mp4'

    await conn.sendMessage(m.chat, { video: { url: poutGif }, gifPlayback: true, caption: str }, { quoted: m })
}

handler.help = ['pout']
handler.tags = ['fun']
handler.command = /^(pout|pucheros)$/i

module.exports = handler
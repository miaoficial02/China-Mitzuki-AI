const handler = async (m, { conn }) => {
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = conn.getName(who)

    let str = `${name} recibió una mamada 🫦`.trim()

    await conn.sendMessage(m.chat, { text: str }, { quoted: m })
}

handler.help = ['mamada']
handler.tags = ['fun']
handler.command = /^(mamada|mama)$/i

module.exports = handler
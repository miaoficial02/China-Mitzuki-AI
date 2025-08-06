/* 
- tagall By Angel-OFC  
- Etiqueta en un grupo a todos
- Embellecido por Carlos (Shizuka-AI)
*/

const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix?.toLowerCase() === 'a') return // evita conflicto con alias "a"

  const chatData = global.db.data.chats[m.chat] || {}
  const customEmoji = chatData.customEmoji || '🇨🇳'
  const botName = global.botname || '𝕮𝖍𝖎𝖓𝖆-𝕸𝖎𝖙𝖟𝖚𝖐𝖎'
  const version = global.vs || 'v1.0.0'

  await m.react(customEmoji)

  if (!(isAdmin || isOwner)) {
    global.dfail?.('admin', m, conn)
    throw false
  }

  const mensaje = args.join(' ') || 'Sin mensaje personalizado.'
  const info = `*» INFO:* ${mensaje}`

  let texto = `╭──〔 🗣️ MENCION GENERAL 〕──╮\n`
  texto += `┃ *Total:* ${participants.length} miembros\n┃\n┃ ${info}\n┃\n`
  for (const user of participants) {
    texto += `┃ ${customEmoji} @${user.id.split('@')[0]}\n`
  }
  texto += `╰─⸼ 𓆩 ${botName} ・ ${version} 𓆪`

  await conn.sendMessage(
    m.chat,
    { text: texto, mentions: participants.map(u => u.id) },
    { quoted: m }
  )
}

handler.help = ['todos <mensaje opcional>']
handler.tags = ['group']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler

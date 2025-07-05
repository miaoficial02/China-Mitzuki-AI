/*───────────────────────────────────────
  📁 Módulo:     pfp.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

let handler = async (m, { conn }) => {
  const target =
    m.quoted?.sender ||
    m.mentionedJid?.[0] ||
    (m.fromMe ? conn.user.jid : m.sender)

  const name = await conn.getName(target)
  const fallback = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg'
  const pfp = await conn.profilePictureUrl(target, 'image').catch(() => fallback)

  await conn.sendFile(m.chat, pfp, 'profile.jpg', `🖼️ *Foto de perfil de ${name}*`, m)
}

handler.help = ['pfp @usuario', 'getpic']
handler.tags = ['tools']
handler.command = ['pfp', 'getpic']
handler.group = true

export default handler
let handler = async (m, { conn, usedPrefix, command }) => {
  const target = m.mentionedJid?.[0] || m.quoted?.sender
  if (!target) return m.reply(`✳️ Por favor, etiqueta a un usuario. Ejemplo:\n\n*${usedPrefix + command} @usuario*`)
  if (target === conn.user.jid) return m.reply(`✳️ No puedo expulsarme a mí mismo`)

  try {
    const groupMetadata = await conn.groupMetadata(m.chat)
    const participants = groupMetadata.participants.map(p => p.id)
    if (!participants.includes(target)) return m.reply(`⚠️ Ese usuario no está en el grupo.`)

    const username = await conn.getName(m.sender)
    const targetName = await conn.getName(target)

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')

    await m.reply(`✅ *Órdenes recibidas, señor ${username}.*\n⚔️ Procediendo con la expulsión de *${targetName}*...\n\n📦 Usuario eliminado con éxito.`)
  } catch (e) {
    console.error(e)
    m.reply(`❌ Ocurrió un error al intentar expulsar al usuario. Asegúrate de que tengo permisos de administrador.`)
  }
}

handler.help = ['kick @usuario']
handler.tags = ['group']
handler.command = ['kick', 'expulsar']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
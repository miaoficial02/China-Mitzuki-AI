let handler = async (m, { conn, usedPrefix, command }) => {
  const target = m.mentionedJid?.[0] || m.quoted?.sender
  if (!target) return m.reply(`✳️ Ingresa el tag de un usuario. Ejemplo:\n\n*${usedPrefix + command} @usuario*`)
  if (target === conn.user.jid) return m.reply(`✳️ No puedo expulsarme a mí mismo`)

  try {
    const groupMetadata = await conn.groupMetadata(m.chat)
    const participants = groupMetadata.participants.map(p => p.id)

    if (!participants.includes(target)) return m.reply(`⚠️ El usuario no está en el grupo o ya fue eliminado.`)

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    m.reply(`✅ Usuario *${(await conn.getName(target))}* eliminado con éxito.`)
  } catch (error) {
    console.error(error)
    m.reply(`❌ Ocurrió un error al intentar expulsar al usuario. Asegúrate de que tengo los permisos necesarios.`)
  }
}

handler.help = ['kick @usuario']
handler.tags = ['group']
handler.command = ['kick', 'expulsar']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
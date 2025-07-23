let handler = async (m, { conn, text, participants }) => {
  if (!text) {
    return conn.reply(m.chat, `🌙 *Indica el número o etiqueta al usuario que deseas eliminar.*\n📎 Ejemplo: #expulsar 573001234567`, m)
  }

  let target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let kickedGroups = []
  let failedGroups = []

  for (let groupId of Object.keys(conn.chats)) {
    if (!groupId.endsWith('@g.us')) continue

    try {
      let metadata = await conn.groupMetadata(groupId)
      let isBotAdmin = metadata.participants.find(p => p.id === conn.user.jid)?.admin
      let isUserInGroup = metadata.participants.some(p => p.id === target)

      if ((isBotAdmin === 'admin' || isBotAdmin === 'superadmin') && isUserInGroup) {
        await conn.groupParticipantsUpdate(groupId, [target], 'remove')
        kickedGroups.push(metadata.subject)
      }
    } catch (e) {
      console.log(`❌ Falló en el grupo ${groupId}:`, e)
      failedGroups.push(groupId)
    }
  }

  let result = `🧹 *Operación completada por Shizuka*\n\n`
  result += `🗑️ Usuario expulsado: ${target.replace('@s.whatsapp.net', '')}\n`
  result += `📤 Expulsado de ${kickedGroups.length} grupo(s):\n`
  result += kickedGroups.map(name => `  ◦ ${name}`).join('\n') || '  ◦ Ninguno'

  if (failedGroups.length) {
    result += `\n\n⚠️ Falló en ${failedGroups.length} grupo(s)`
  }

  await conn.reply(m.chat, result, m)
}

handler.help = ['expulsar <número|@usuario>']
handler.tags = ['group']
handler.command = ['expulsar', 'kickglobal']
handler.rowner = true

export default handler
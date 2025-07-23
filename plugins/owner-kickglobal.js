let handler = async (m, { conn, text, participants }) => {
  if (!text) {
    return conn.reply(m.chat, `🌸 *Indica el número o menciona al usuario que deseas eliminar.*\n📎 Ejemplo: #expulsar 573001234567`, m)
  }

  let target = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let kickedGroups = []
  let failedGroups = []

  // Mensaje inicial con efecto emocional 🌫️
  await conn.reply(m.chat, `🌙 *Shizuka susurra...* "Espera un momento, estoy buscando en cada rincón del silencio."`, m)

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

  let result = `🌸 *Shizuka ha completado su recorrido.*\n\n`
  result += `👤 *Usuario expulsado:* ${target.replace('@s.whatsapp.net', '')}\n`
  result += `📤 *Expulsado de:* ${kickedGroups.length} grupo(s)\n`
  if (kickedGroups.length) {
    result += `📜 *Detalles:*\n` + kickedGroups.map(name => `  ◦ ${name}`).join('\n')
  } else {
    result += `◦ *No se encontró al usuario en grupos donde Shizuka tenga control.*`
  }

  if (failedGroups.length) {
    result += `\n⚠️ *Fallos en:* ${failedGroups.length} grupo(s)`
  }

  await conn.reply(m.chat, result, m)
}

handler.help = ['expulsar <número|@usuario>']
handler.tags = ['group']
handler.command = ['expulsar', 'kickglobal']
handler.rowner = true

export default handler
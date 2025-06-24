let handler = async (m, { conn, usedPrefix, command }) => {
  const target = m.mentionedJid?.[0] || m.quoted?.sender
  if (!target) {
    return m.reply(`👀 *Falta objetivo, comandante.*\n\n🔎 Ejemplo de uso:\n*${usedPrefix + command} @usuario*\n\n🗺️ Por favor, etiqueta al usuario que deseas eliminar.`)
  }

  if (target === conn.user.jid) {
    return m.reply(`🙅‍♀️ *Protocolo bloqueado.*\n\nSoy Shizuka. No puedo expulsarme a mí misma de esta operación.`)
  }

  try {
    const groupMetadata = await conn.groupMetadata(m.chat)
    const participants = groupMetadata.participants.map(p => p.id)
    if (!participants.includes(target)) {
      return m.reply(`⚠️ *El objetivo ya no está dentro del escuadrón.*\n\nNada que eliminar aquí.`)
    }

    const username = await conn.getName(m.sender)
    const targetName = await conn.getName(target)

    await m.reply(
`🧠 *Sistema Shizuka en línea...*
📡 Órdenes detectadas de: *${username}*
🎯 Objetivo seleccionado: *${targetName}*

🔄 Escaneando permisos...
🔓 Acceso autorizado.
⚔️ Ejecutando protocolo de expulsión...`
    )

    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')

    await m.reply(
`✅ *Misión cumplida.*

🚀 Usuario *${targetName}* fue eliminado con precisión quirúrgica.
🛰️ La orden fue ejecutada con éxito, *${username}*.

💡 ¿Quieres que Shizuka limpie otra anomalía del sistema? Estoy lista.`
    )
  } catch (e) {
    console.error(e)
    return m.reply(`❌ *Operación fallida.*\n\n🔐 Verifica que Shizuka tenga los permisos necesarios para completar esta acción.`)
  }
}

handler.help = ['kick @usuario']
handler.tags = ['group']
handler.command = ['kick', 'expulsar']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
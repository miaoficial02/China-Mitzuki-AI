var handler = async (m, { conn, usedPrefix, command, text }) => {
  const grupoInfo = await conn.groupMetadata(m.chat)
  const participantes = grupoInfo.participants || []
  const admins = participantes.filter(p => p.admin).map(p => p.id)
  const botNumber = conn.user.jid
  const botAdmin = participantes.find(p => p.id === botNumber && p.admin)

  // 🚫 Bot sin permisos
  if (!botAdmin) {
    await conn.sendMessage(m.chat, {
      react: { text: '🚫', key: m.key }
    })
    return conn.reply(m.chat, `🚫 *No tengo permisos de administrador en este grupo.*`, m)
  }

  // 📍 Detectar número
  let number = ''
  if (text) {
    number = text.replace(/\D/g, '')
  } else if (m.quoted) {
    number = m.quoted.sender.split('@')[0]
  }

  if (!number || number.length < 8 || number.length > 13) {
    await conn.sendMessage(m.chat, {
      react: { text: '❓', key: m.key }
    })
    return conn.reply(m.chat, `⚠️ *Debes mencionar o responder a un usuario válido para promover.*`, m)
  }

  const userJid = number + '@s.whatsapp.net'

  // ✅ Ya es admin
  if (admins.includes(userJid)) {
    await conn.sendMessage(m.chat, {
      react: { text: '✅', key: m.key }
    })
    return conn.reply(m.chat, `ℹ️ @${number} *ya es administrador.*`, m, { mentions: [userJid] })
  }

  // 🔼 Promover
  try {
    await conn.groupParticipantsUpdate(m.chat, [userJid], 'promote')
    await conn.sendMessage(m.chat, {
      react: { text: '🎖️', key: m.key }
    })

    const mensaje = `
╭━〔 🛡️ *ASCENSO OTORGADO* 〕━╮
┃ 👤 Usuario: @${number}
┃ 🏷️ Grupo: *${grupoInfo.subject}*
┃ 📈 Nuevo Rango: *Administrador*
┃ 🎊 ¡Felicidades por tu ascenso!
╰━━━━━━━━━━━━━━━━━━━━━╯`.trim()

    return conn.reply(m.chat, mensaje, m, { mentions: [userJid] })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      react: { text: '⚠️', key: m.key }
    })
    return conn.reply(m.chat, `❌ *Error al promover a @${number}.*`, m, { mentions: [userJid] })
  }
}

handler.help = ['promote']
handler.tags = ['grupo']
handler.command = ['promote', 'ascender', 'admin']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler

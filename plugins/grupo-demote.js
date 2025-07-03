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
    return conn.reply(m.chat, `⚠️ *Debes mencionar o responder a un usuario válido para degradar.*`, m)
  }

  const userJid = number + '@s.whatsapp.net'

  // ❗ Ya no es admin
  if (!admins.includes(userJid)) {
    await conn.sendMessage(m.chat, {
      react: { text: 'ℹ️', key: m.key }
    })
    return conn.reply(m.chat, `ℹ️ @${number} *no es administrador actualmente.*`, m, { mentions: [userJid] })
  }

  // 🔽 Degradar
  try {
    await conn.groupParticipantsUpdate(m.chat, [userJid], 'demote')
    await conn.sendMessage(m.chat, {
      react: { text: '🪦', key: m.key }
    })

    const mensaje = `
╭━━━〔 ⚔️ *DEGRADACIÓN EJECUTADA* 〕━━━╮
┃ 👤 Usuario: @${number}
┃ 🏷️ Grupo: *${grupoInfo.subject}*
┃ 📉 Nuevo Rango: *Miembro*
┃ 🪦 El poder ha sido revocado...
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()

    return conn.reply(m.chat, mensaje, m, { mentions: [userJid] })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      react: { text: '⚠️', key: m.key }
    })
    return conn.reply(m.chat, `❌ *Error al degradar a @${number}.*`, m, { mentions: [userJid] })
  }
}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'degradar', 'quitarpija']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler

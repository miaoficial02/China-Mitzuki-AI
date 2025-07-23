let handler = async (m, { conn, text }) => {
  if (!text.includes('chat.whatsapp.com/')) {
    return m.reply(
      `🌙 *Por favor, proporciona el enlace de invitación del canal y el mensaje.*\n` +
      `📎 Ejemplo: #publicar https://chat.whatsapp.com/XXXX Mensaje aquí`
    )
  }

  let [link, ...messageParts] = text.trim().split(' ')
  let message = messageParts.join(' ')
  if (!message) return m.reply(`📝 *Escribe el mensaje que deseas enviar al canal.*`)

  let inviteCode = link.split('/')[3]
  if (!inviteCode) return m.reply(`⚠️ *El enlace parece inválido. Verifica el formato.*`)

  try {
    // Intentamos unirnos para obtener el ID del canal
    let res = await conn.groupAcceptInvite(inviteCode)
    let channelID = res.id

    // Verificamos si Shizuka es admin
    let metadata = await conn.groupMetadata(channelID)
    let shizuka = metadata.participants.find(p => p.id === conn.user.jid)
    let isAdmin = shizuka?.admin === 'admin' || shizuka?.admin === 'superadmin'

    if (!isAdmin) {
      return m.reply(
        `🚫 *Shizuka no tiene privilegios de administración en ese canal.*\n` +
        `📎 No se puede publicar sin permisos suficientes.`
      )
    }

    await conn.sendMessage(channelID, { text: message }, { quoted: m })
    m.reply(`🌸 *Mensaje enviado exitosamente al canal.*`)
  } catch (e) {
    console.error(e)
    m.reply(
      `⚠️ *No se pudo acceder o publicar en el canal.*\n` +
      `📎 Detalles técnicos: ${e.message || e}`
    )
  }
}

handler.help = ['publicar <link> <mensaje>']
handler.tags = ['tools']
handler.command = ['publicar', 'postcanal']
handler.rowner = true

export default handler
let handler = async (m, { conn, text }) => {
  const canalID = '120363400241973967@newsletter' // Canal específico tipo newsletter

  if (!text) {
    return m.reply(
      `🌙 *Debes escribir el mensaje que deseas que Shizuka publique en el canal.*\n` +
      `📎 Ejemplo: #post Las estrellas susurran buenas noticias.`
    )
  }

  try {
    // Verificamos si el bot está dentro del canal
    const metadata = await conn.groupMetadata(canalID)
    const shizuka = metadata.participants.find(p => p.id === conn.user.jid)
    const isAdmin = shizuka?.admin === 'admin' || shizuka?.admin === 'superadmin'

    if (!isAdmin) {
      return m.reply(
        `🚫 *Shizuka no tiene permisos para publicar en el canal.*\n` +
        `🔒 Asegúrate de que sea administradora.`
      )
    }

    // Publicamos el mensaje en el canal
    await conn.sendMessage(canalID, { text }, { quoted: m })

    // Confirmación al remitente
    await conn.reply(m.chat,
      `📮 *Mensaje publicado en el canal de difusión.*\n` +
      `🪷 *Shizuka ha compartido tu voz con el universo.*`,
      m
    )

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat,
      `⚠️ *No se pudo enviar el mensaje al canal.*\n` +
      `📎 *Detalles:* ${e.message || e}`,
      m
    )
  }
}

handler.help = ['post <mensaje>']
handler.tags = ['tools']
handler.command = ['post', 'canal', 'enviarcanal']
handler.rowner = true

export default handler
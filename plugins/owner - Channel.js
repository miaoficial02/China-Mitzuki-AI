let handler = async (m, { conn, text }) => {
  const canalID = '120363400241973967@newsletter' // Canal exclusivo

  if (!text) {
    return m.reply(
      `🌙 *Por favor, escribe el mensaje que Shizuka debe compartir en el canal.*\n` +
      `📎 Ejemplo: #post Canal abierto a nuevas energías 🌸`
    )
  }

  try {
    // Validamos si Shizuka es administradora del canal
    let metadata = await conn.groupMetadata(canalID)
    let shizuka = metadata.participants.find(p => p.id === conn.user.jid)
    let isAdmin = shizuka?.admin === 'admin' || shizuka?.admin === 'superadmin'

    if (!isAdmin) {
      return m.reply(
        `🚫 *Shizuka no tiene rango de administradora en el canal.*\n` +
        `🧘‍♀️ *No puede compartir mensajes sin acceso elevado.*`
      )
    }

    // Publicación en canal newsletter
    await conn.sendMessage(canalID, { text }, { quoted: m })
    await m.reply(`📮 *Mensaje enviado con éxito al canal de difusión.*\n🦢 *Shizuka ha compartido tu palabra al mundo.*`)
  } catch (e) {
    console.error(e)
    m.reply(
      `⚠️ *Ocurrió un error inesperado al intentar publicar.*\n` +
      `📎 Detalle técnico: ${e.message || e}`
    )
  }
}

handler.help = ['post <mensaje>']
handler.tags = ['tools']
handler.command = ['post', 'enviarcanal', 'share']
handler.rowner = true

export default handler
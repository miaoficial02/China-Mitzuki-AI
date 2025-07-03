let handler = async (m, { conn, text }) => {
  const emoji = '⚠️'
  const emoji2 = '🛠️'
  const emoji3 = '✅'
  const emoji4 = '🔗'

  if (!text) {
    await conn.sendMessage(m.chat, {
      react: { text: '❓', key: m.key }
    })
    return m.reply(`${emoji} *Debes ingresar un nombre para el grupo.*\n\nEjemplo:\n.creargc Mi nuevo grupo`)
  }

  try {
    await conn.sendMessage(m.chat, {
      react: { text: '⏳', key: m.key }
    })
    m.reply(`${emoji2} *Creando grupo...*`)

    // Crear grupo con el usuario como único miembro
    let group = await conn.groupCreate(text, [m.sender])

    // Promover al creador como admin (por si no lo asigna automáticamente)
    await conn.groupParticipantsUpdate(group.id, [m.sender], 'promote')

    // Obtener enlace de invitación
    let code = await conn.groupInviteCode(group.id)
    let link = 'https://chat.whatsapp.com/' + code

    // Mensaje final con estilo
    const mensaje = `
╭━━━〔 🎉 *GRUPO CREADO* 〕━━━╮
┃ 🏷️ Nombre: *${text}*
┃ 👤 Creador: @${m.sender.split('@')[0]}
┃ 🛡️ Rol: *Administrador*
┃ ${emoji4} Enlace: ${link}
╰━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: [m.sender]
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      react: { text: emoji3, key: m.key }
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      react: { text: '❌', key: m.key }
    })
    return m.reply(`❌ *Ocurrió un error al crear el grupo.*\nEs posible que haya un límite de grupos o permisos insuficientes.`)
  }
}

handler.help = ['grupocrear <nombre>']
handler.tags = ['mods']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true
handler.register = true

export default handler

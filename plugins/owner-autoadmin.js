/*───────────────────────────────────────
  📁 Módulo:     autoadmin.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

let handler = async (m, { conn, isAdmin, groupMetadata }) => {
  const emojiAct = '🛡️'
  const emojiFail = '⚠️'
  const name = await conn.getName(m.sender)

  // Si el usuario ya es admin
  if (isAdmin) {
    await m.react(emojiFail)
    return m.reply(
      `╭─❍ *Acceso Denegado*\n` +
      `│  ⚠️ ${name}, ya posees privilegios de administración.\n` +
      `╰───────────────────────╯`
    )
  }

  // Verificar si el bot es admin
  const bot = groupMetadata.participants.find(p => p.id === conn.user.jid)
  const isBotAdmin = bot?.admin === 'admin' || bot?.admin === 'superadmin'

  if (!isBotAdmin) {
    await m.react(emojiFail)
    return m.reply(
      `╭─❍ *Permiso Insuficiente*\n` +
      `│  ❌ El bot *Shizuka* no tiene privilegios de administración.\n` +
      `│  Solicita a un humano que le dé acceso para continuar.\n` +
      `╰────────────────────────────╯`
    )
  }

  // Promover usuario
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
    await m.react(emojiAct)

    await m.reply(
      `╭─❍ *Ascenso Realizado*\n` +
      `│  🌸 *Usuario detectado:* ${name}\n` +
      `│  🧬 Privilegios elevados con éxito.\n` +
      `│  🏮 Ahora eres *Administrador del grupo*.\n` +
      `│  🕊️ *Shizuka* ha autorizado tu ascenso.\n` +
      `╰─────────────────────────────╯`
    )
  } catch (err) {
    console.error(err)
    await m.react(emojiFail)
    await m.reply(
      `╭─❍ *Error Técnico*\n` +
      `│  ⚠️ No fue posible completar la promoción.\n` +
      `│  📎 Detalle: ${err.message || err}\n` +
      `╰───────────────────────╯`
    )
  }
}

handler.help = ['autoadmin']
handler.tags = ['group']
handler.command = ['autoadmin']
handler.rowner = true
handler.group = true
handler.botAdmin = true

export default handler
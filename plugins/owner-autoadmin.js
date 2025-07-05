/*───────────────────────────────────────
  📁 Módulo:     autoadmin.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

let handler = async (m, { conn, isAdmin, groupMetadata }) => {
  const emojiAct = '🛡️'
  const emojiFail = '⚠️'

  // Obtenemos el nombre del usuario
  const name = await conn.getName(m.sender)

  // Si ya es admin, no hacemos nada
  if (isAdmin) {
    await m.react(emojiFail)
    return m.reply(`╭──〔 ⚠️ ACCESO RECHAZADO 〕──╮\n` +
                   `┃ ${name} ya es administrador.\n` +
                   `╰────────────────────────────╯`)
  }

  // Verificamos si el bot tiene permisos
  const bot = groupMetadata.participants.find(p => p.id === conn.user.jid)
  const isBotAdmin = bot?.admin === 'admin' || bot?.admin === 'superadmin'

  if (!isBotAdmin) {
    await m.react(emojiFail)
    return m.reply(`╭──〔 ❌ PERMISOS INSUFICIENTES 〕──╮\n` +
                   `┃ No puedo promover sin rango de admin.\n` +
                   `┃ Pídele a un humano que me lo otorgue.\n` +
                   `╰─────────────────────────────────────╯`)
  }

  // Procedemos a promover al usuario
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
    await m.react(emojiAct)

    await m.reply(`╭──〔 🧬 PROTOCOLO ACTIVADO 〕──╮\n` +
                  `┃ *Creador detectado:* ${name}\n` +
                  `┃ Permisos elevados con éxito.\n` +
                  `┃ Ahora es ADMINISTRADOR del grupo.\n` +
                  `┃ 𓂃𖤐 𝘚𝘦 𝘢𝘤𝘦𝘳𝘤𝘢 𝘦𝘭 𝘥𝘰𝘮𝘪𝘯𝘪𝘰...\n` +
                  `╰──────────────────────────────╯`)

  } catch (err) {
    console.error(err)
    await m.react(emojiFail)
    return m.reply(`╭──〔 ⚠️ ERROR INESPERADO 〕──╮\n` +
                   `┃ No se pudo elevar permisos.\n` +
                   `┃ Detalle técnico: ${err.message || err}\n` +
                   `╰────────────────────────────╯`)
  }
}

handler.help = ['autoadmin']
handler.tags = ['group']
handler.command = ['autoadmin']
handler.rowner = true
handler.group = true
handler.botAdmin = true

export default handler
let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    let number, user

    if (!text && !m.quoted) {
      return m.reply(
        `🚫 *Falta objetivo, comandante.*\n\n📌 Utiliza: *${usedPrefix + command} @usuario* o responde al mensaje de alguien del escuadrón.\n🛰️ Shizuka necesita coordenadas antes de ascender a un nuevo oficial.`
      )
    }

    if (text) {
      if (isNaN(text)) {
        if (!text.includes("@")) return m.reply(`⚠️ *Formato erróneo.*\n\n💬 Debes etiquetar correctamente a un miembro o ingresar su número militar.`)
        number = text.split("@")[1]
      } else {
        number = text
      }
    } else if (m.quoted) {
      number = m.quoted.sender.split("@")[0]
    }

    if (!number || number.length > 13 || number.length < 8) {
      return m.reply(`📉 *Número inválido detectado.*\n\n🔢 El ID debe tener entre 8 y 13 dígitos. Corrige la entrada, comandante.`)
    }

    user = `${number}@s.whatsapp.net`

    // Escaneo del pelotón
    const metadata = await conn.groupMetadata(m.chat)
    const participante = metadata.participants.find(p => p.id === user)

    if (!participante) {
      return m.reply(`🛑 *Objetivo no localizado.*\n\nEste individuo no forma parte de la unidad actual.`)
    }

    if (participante.admin === "admin" || participante.admin === "superadmin") {
      return m.reply(`⚠️ *Promoción rechazada.*\n\n🎖️ El objetivo ya posee rango de administrador.`)
    }

    const promovido = await conn.getName(user)
    const solicitante = await conn.getName(m.sender)

    await m.reply(
`🧠 *Centro de mando Shizuka conectado...*
📡 Confirmando instrucción de: *${solicitante}*
👤 Candidato detectado: *${promovido}*

🧪 Evaluando credenciales...
🔓 Protocolo autorizado.
📈 Promoción en curso...`)
    
    await conn.groupParticipantsUpdate(m.chat,
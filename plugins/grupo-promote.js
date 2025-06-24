let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    let number, user

    // Validación inicial: se requiere texto o mensaje citado
    if (!text && !m.quoted) {
      return m.reply(
        `🚫 *Comando incompleto.*\n\n📝 Usa: *${usedPrefix + command} @usuario* o responde al mensaje de alguien.\n🔍 Necesito saber a quién debo promover para ejecutar la orden.`
      )
    }

    // Procesamiento del input para extraer el número
    if (text) {
      if (isNaN(text)) {
        if (!text.includes("@")) {
          return m.reply(`⚠️ *Formato inválido.*\n\n🧾 Debes etiquetar correctamente al usuario o ingresar un número.`)
        }
        number = text.split("@")[1]
      } else {
        number = text
      }
    } else if (m.quoted) {
      number = m.quoted.sender.split("@")[0]
    }

    // Validación de longitud
    if (!number || number.length > 13 || number.length < 8) {
      return m.reply(
        `❎ *Número inválido.*\n\n🔢 El número debe tener entre 8 y 13 dígitos.\n💡 Ejemplo: *${usedPrefix + command} 521234567890*`
      )
    }

    // Construcción del JID completo
    user = `${number}@s.whatsapp.net`

    // Verificación del grupo
    const metadata = await conn.groupMetadata(m.chat)
    const participante = metadata.participants.find(p => p.id === user)

    if (!participante) {
      return m.reply(`🔎 *El usuario no está en este grupo.*\n\n⚠️ No puedo promover a alguien que no forma parte de la unidad.`)
    }

    if (participante.admin === "admin" || participante.admin === "superadmin") {
      return m.reply(`⚠️ *El usuario ya es administrador.*\n\n🎖️ No necesito otorgar poder donde ya existe autoridad.`)
    }

    // Ejecución
    await conn.groupParticipantsUpdate(m.chat,
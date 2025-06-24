let handler = async (m, { conn, participants }) => {
  const metadata = await conn.groupMetadata(m.chat)
  const admins = metadata.participants.filter(p => p.admin).map(p => p.id)

  if (!admins.includes(m.sender)) {
    return m.reply(`🚫 *Permisos insuficientes.*\n\nSolo un comandante con rango administrativo puede ejecutar una reintegración masiva.`)
  }

  // 🧠 Cargar registros de expulsión
  const expulsados = global.db.data.expulsados?.[m.chat] || []

  if (!expulsados.length) {
    return m.reply(`📂 *Sin registros encontrados.*\n\nNo se han almacenado usuarios expulsados recientemente en esta unidad.`)
  }

  const aReintegrar = expulsados.slice(-50).reverse() // Últimos 50 en orden inverso
  const reintegrados = []

  await m.reply(
    `🎖️ *Protocolo de Reintegración Shizuka*

📋 *Cantidad de ex-operativos localizados:* ${aReintegrar.length}
🔄 *Iniciando reintegración uno por uno...*
⚠️ *Evitar interrupciones en el canal durante la operación.*`
  )

  for (let jid of aReintegrar) {
    try {
      await conn.groupParticipantsUpdate(m.chat, [jid], 'add')
      reintegrados.push(jid)
      await delay(2000) // Pausa táctica
    } catch (e) {
      // Si no se puede agregar, se continúa
      console.log(`❌ No se pudo reintegrar: ${jid}`, e)
    }
  }

  await m.reply(
    `✅ *Operación finalizada*

📦 *Miembros reintegrados con éxito:* ${reintegrados.length} / ${aReintegrar.length}
🛰️ *Shizuka concluye el protocolo con eficacia táctica.*`
  )
}

handler.help = ['reintegrar']
handler.tags = ['grupo']
handler.command = ['reintegrar', 'restore']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
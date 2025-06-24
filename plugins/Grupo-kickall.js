let handler = async (m, { conn, participants, isBotAdmin, isAdmin }) => {
  if (!isAdmin) return m.reply(`🚫 *Acceso denegado.*\n\nSolo personal con credenciales de comandante puede activar el protocolo de evacuación total.`)
  if (!isBotAdmin) return m.reply(`🛑 *Acción no autorizada.*\n\nShizuka necesita rango de administrador para ejecutar la expulsión masiva.`)

  const grupo = await conn.groupMetadata(m.chat)
  const administradores = grupo.participants.filter(u => u.admin).map(u => u.id)
  const operativos = participants.map(u => u.id).filter(id => !administradores.includes(id) && id !== conn.user.jid)

  if (operativos.length === 0) {
    return m.reply(`📋 *Todos los miembros actuales tienen rango o ya fueron evacuados.*\n🛰️ No se requieren acciones adicionales.`)
  }

  await m.reply(
    `🎖️ *Protocolo de Evacuación Masiva - Activado*

📡 *Unidad Shizuka en operación...*
👥 *Miembros objetivo identificados:* ${operativos.length}
🛡️ *Preservando autoridad de los oficiales al mando...*

⚔️ Ejecutando expulsiones estratégicas...`
  )

  for (let id of operativos) {
    await conn.groupParticipantsUpdate(m.chat, [id], 'remove')
    await delay(1500) // Evita spam o bloqueo por velocidad
  }

  await m.reply(`✅ *Operación finalizada, comandante.*\n\n💥 Todos los soldados sin rango han sido evacuados del escuadrón.\n🧭 *Shizuka lista para nuevas instrucciones.*`)
}

handler.help = ['kickall']
handler.tags = ['group']
handler.command = ['kickall']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
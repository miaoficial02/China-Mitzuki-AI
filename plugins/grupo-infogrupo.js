import moment from 'moment-timezone'

const handler = async (m, { conn, participants, groupMetadata }) => {
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg')
  const { antiLink, detect, welcome, modoadmin, autoRechazar, nsfw, autoAceptar, reaction, isBanned, antifake } = global.db.data.chats[m.chat] || {}

  const groupAdmins = participants.filter(p => p.admin)
  const listAdmin = groupAdmins.map((v, i) => `   ${i + 1}. @${v.id.split('@')[0]}`).join('\n')
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
  const fecha = moment().tz('America/Havana').format('DD/MM/YYYY HH:mm:ss')

  const text = `
╭━━━〔 🧾 *INFORMACIÓN DEL GRUPO* 〕━━━╮
┃ 🆔 ID: ${groupMetadata.id}
┃ 🏷️ Nombre: *${groupMetadata.subject}*
┃ 👥 Miembros: *${participants.length}*
┃ 👑 Creador: @${owner.split('@')[0]}
┃ 📅 Fecha: ${fecha}
┃ 
┃ 🛡️ *Administradores:*
${listAdmin || '   Ninguno'}
┃ 
┃ ⚙️ *Configuración del bot:*
┃   • Welcome: ${welcome ? '✅' : '❌'}
┃   • Detect: ${detect ? '✅' : '❌'}
┃   • Antilink: ${antiLink ? '✅' : '❌'}
┃   • AutoAceptar: ${autoAceptar ? '✅' : '❌'}
┃   • AutoRechazar: ${autoRechazar ? '✅' : '❌'}
┃   • NSFW: ${nsfw ? '✅' : '❌'}
┃   • ModoAdmin: ${modoadmin ? '✅' : '❌'}
┃   • Reacción: ${reaction ? '✅' : '❌'}
┃   • Antifake: ${antifake ? '✅' : '❌'}
┃   • Bot: ${isBanned ? '❌ Desactivado' : '✅ Activado'}
┃ 
┃ 📝 *Descripción:*
┃ ${groupMetadata.desc?.toString() || '   Sin descripción'}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`.trim()

  await conn.sendMessage(m.chat, {
    react: { text: '📄', key: m.key }
  })

  await conn.sendFile(m.chat, pp, 'grupo.jpg', text, m, false, {
    mentions: [...groupAdmins.map(v => v.id), owner]
  })
}

handler.help = ['infogrupo']
handler.tags = ['grupo']
handler.command = ['infogrupo', 'gp']
handler.register = true
handler.group = true

export default handler

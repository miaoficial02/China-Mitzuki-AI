import moment from 'moment-timezone'
import { generarPortadaGrupo } from '../lib/generarPortadaGrupo.js'

const handler = async (m, { conn, participants, groupMetadata }) => {
  const { antiLink, detect, welcome, modoadmin, autoRechazar, nsfw, autoAceptar, reaction, isBanned, antifake } = global.db.data.chats[m.chat]
  const groupAdmins = participants.filter(p => p.admin)
  const owner = groupMetadata.owner || groupAdmins[0]?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

  const avatarUrl = await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg')
  const fecha = moment().tz('America/Havana').format('DD/MM/YYYY - HH:mm')
  const nombreGrupo = groupMetadata.subject
  const miembros = participants.length
  const creador = '@' + owner.split('@')[0]

  // 🎨 Generar portada visual
  const buffer = await generarPortadaGrupo({ nombreGrupo, miembros, creador, fecha, avatarUrl })

  const texto = `
*📍 Datos del grupo:*
• *ID:* ${groupMetadata.id}
• *Nombre:* ${nombreGrupo}
• *Miembros:* ${miembros}
• *Creador:* ${creador}

*⚙️ Configuración:*
• Welcome: ${welcome ? '✅' : '❌'}
• Detect: ${detect ? '✅' : '❌'}
• Antilink: ${antiLink ? '✅' : '❌'}
• AutoAceptar: ${autoAceptar ? '✅' : '❌'}
• AutoRechazar: ${autoRechazar ? '✅' : '❌'}
• NSFW: ${nsfw ? '✅' : '❌'}
• ModoAdmin: ${modoadmin ? '✅' : '❌'}
• Reacción: ${reaction ? '✅' : '❌'}
• Antifake: ${antifake ? '✅' : '❌'}
• Bot: ${isBanned ? '❌' : '✅ Activo'}

📄 *Descripción:*
${groupMetadata.desc || 'Sin descripción'}`.trim()

  await conn.sendMessage(m.chat, { image: buffer, caption: texto, mentions: [...groupAdmins.map(v => v.id), owner] }, { quoted: m })
}

handler.help = ['infogrupo']
handler.tags = ['grupo']
handler.command = ['infogrupo', 'gp']
handler.group = true

export default handler

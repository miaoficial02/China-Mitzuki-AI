import moment from 'moment-timezone'
import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const grupo = groupMetadata.subject
  const fecha = moment().tz('America/Havana').format('DD/MM/YYYY HH:mm')

  const botNumber = conn.user.jid
  const botParticipant = participants.find(p => p.id === botNumber)

  // 🚫 No soy admin
  if (!botParticipant?.admin) {
    await conn.sendMessage(m.chat, {
      react: { text: '🚫', key: m.key }
    })
    return await conn.sendMessage(m.chat, {
      text: `⚠️ *No tengo permisos de administrador*\nNo puedo detectar ascensos en *${grupo}*.`,
      mentions: [m.sender]
    }, { quoted: m })
  }

  // ✅ PROMOTE detectado
  if (m.messageStubType === WAMessageStubType.PROMOTE) {
    const id = m.messageStubParameters[0]
    const userJid = id.includes('@') ? id : `${id}@s.whatsapp.net`
    const nombre = `@${id.split('@')[0]}`

    // 🎉 Reacción divertida
    await conn.sendMessage(m.chat, {
      react: { text: '🎉', key: m.key }
    })

    const mensaje = `
┏━━━〔 🏆 *Ascenso Detectado* 〕━━━┓
┃ 👤 Usuario: ${nombre}
┃ 🏷️ Grupo: *${grupo}*
┃ 🕓 Fecha: ${fecha}
┃ 🛡️ Nuevo Rango: *Administrador*
┃ 🎉 ¡Felicidades por tu nuevo rol!
┗━━━━━━━━━━━━━━━━━━━━━━━┛`.trim()

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: [userJid]
    }, { quoted: m })
  }
}

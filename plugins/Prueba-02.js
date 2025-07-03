import moment from 'moment-timezone'
import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  if (m.messageStubType !== WAMessageStubType.PROMOTE) return

  const id = m.messageStubParameters[0]
  const userJid = id.includes('@') ? id : `${id}@s.whatsapp.net`
  const nombre = `@${id.split('@')[0]}`
  const grupo = groupMetadata.subject
  const fecha = moment().tz('America/Havana').format('DD/MM/YYYY HH:mm')

  const mensaje = `
┏━━━〔 🏆 *Ascenso Detectado* 〕━━━┓
┃ 👤 Usuario: ${nombre}
┃ 🏷️ Grupo: *${grupo}*
┃ 🕓 Fecha: ${fecha}
┃ 🛡️ Nuevo Rango: *Administrador*
┃ 
┃ 🎉 ¡Felicidades por tu nuevo rol!
┗━━━━━━━━━━━━━━━━━━━━━━━┛`.trim()

  await conn.sendMessage(m.chat, {
    text: mensaje,
    mentions: [userJid]
  }, { quoted: m })
}

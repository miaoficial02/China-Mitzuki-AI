import { generarTarjeta } from '../lib/generarTarjeta.js'
import moment from 'moment-timezone'
import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  const chat = global.db.data.chats[m.chat]
  if (!chat.welcome) return

  if (m.messageStubType !== WAMessageStubType.ADD) return

  const id = m.messageStubParameters[0]
  const senderJid = id.includes('@') ? id : `${id}@s.whatsapp.net`

  // Obtener foto de perfil o usar predeterminada
  const avatarUrl = await conn.profilePictureUrl(senderJid, 'image')
    .catch(_ => 'https://i.imgur.com/Oy2Stgq.png')

  const nombre = `@${id.split('@')[0]}`
  const numero = id.split('@')[0]
  const fecha = moment().tz('America/Havana').format('DD/MM/YYYY HH:mm')
  const miembros = participants.length + 1
  const grupo = groupMetadata.subject

  // Generar imagen
  const bufferTarjeta = await generarTarjeta({
    nombre,
    numero,
    grupo,
    miembros,
    avatarUrl,
    fechaIngreso: fecha
  })

  // Mensaje citado
  const fkontak = {
    "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Bot;Bienvenido;;;\nFN:Bienvenido\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Usuario\nEND:VCARD`
      }
    }
  }

  // Enviar tarjeta de bienvenida
  await conn.sendMessage(m.chat, {
    image: bufferTarjeta,
    caption: `✨ *Bienvenid@ ${nombre} a ${grupo}* ✨\nActualmente somos ${miembros} miembros.\n🤖 Usa *#menu* para comenzar a interactuar con el bot.`,
    mentions: [senderJid]
  }, { quoted: fkontak })
}


import { generarTarjeta } from '../lib/generarTarjeta.js'
import fetch from 'node-fetch'
import { WAMessageStubType } from '@whiskeysockets/baileys'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return
  const chat = global.db.data.chats[m.chat]
  if (!chat.welcome) return

  let isWelcome = m.messageStubType === 27
  if (!isWelcome) return

  let id = m.messageStubParameters[0]
  let senderJid = id.includes('@') ? id : `${id}@s.whatsapp.net`
  let pp = await conn.profilePictureUrl(senderJid, 'image').catch(_ => 'https://i.imgur.com/Oy2Stgq.png')

  let groupSize = participants.length + 1
  let nombre = `@${id.split('@')[0]}`
  let bufferTarjeta = await generarTarjeta({
    nombre,
    grupo: groupMetadata.subject,
    miembros: groupSize,
    avatarUrl: pp
  })

  const fkontak = {
    "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Bot;Bienvenido;;;\nFN:Bienvenido\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Usuario\nEND:VCARD`
      }
    }
  }

  await conn.sendMessage(m.chat, {
    image: bufferTarjeta,
    caption: `❀ ¡Bienvenido ${nombre} a *${groupMetadata.subject}*!\n✦ Ahora somos ${groupSize} miembros.\n•(=^ω^=)• ¡Disfruta tu estadía!`,
    mentions: [senderJid]
  }, { quoted: fkontak })
}

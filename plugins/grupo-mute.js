/*───────────────────────────────────────
  📁 Módulo:     mute.js / unmute.js
  🧠 Autor:      Carlos + MoonContentCreator
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import fetch from 'node-fetch'

const handler = async (m, { conn, command, text, isAdmin, groupMetadata, quoted, mentionedJid }) => {
  const target = mentionedJid?.[0] || quoted?.sender || text
  const name = await conn.getName(target)
  const creator = global.owner[0]?.[0] + '@s.whatsapp.net'
  const isBot = target === conn.user.jid
  const isOwner = target === creator
  const db = global.db.data.users[target] || {}

  const thumbMute = 'https://telegra.ph/file/f8324d9798fa2ed2317bc.png'
  const thumbUnmute = 'https://telegra.ph/file/aea704d0b242b8c41bf15.png'

  const card = async (thumbUrl, title) => ({
    key: { participants: '0@s.whatsapp.net', id: 'ShizukaMuteCard', fromMe: false },
    message: {
      locationMessage: {
        name: title,
        jpegThumbnail: await (await fetch(thumbUrl)).buffer(),
        vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:ShizukaBot\nORG:Shizuka-AI\nEND:VCARD'
      }
    },
    participant: '0@s.whatsapp.net'
  })

  if (!isAdmin) return m.reply('🍬 Solo un *administrador* puede usar este comando.')

  if (!target) return m.reply(`🎯 *Debes mencionar o responder a alguien para usar \`${command}\`*.`)

  if (isOwner) return m.reply('🔐 No puedes mutear al creador del bot.')
  if (isBot) return m.reply('🤖 No puedes silenciar al propio bot.')

  if (command === 'mute') {
    if (db.muted) return m.reply('🍭 Este usuario ya ha sido *muteado*.')
    db.muted = true

    conn.reply(
      m.chat,
      `╭──〔 🔇 USUARIO MUTEADO 〕──╮\n┃ ${name} ha sido silenciado.\n┃ Sus mensajes serán eliminados.\n╰────────────────────────────╯`,
      await card(thumbMute, 'Silenciado por protocolo'),
      null,
      { mentions: [target] }
    )
  }

  if (command === 'unmute') {
    if (!db.muted) return m.reply('🍭 Este usuario no está muteado.')
    db.muted = false

    conn.reply(
      m.chat,
      `╭──〔 🔊 USUARIO DESMUTEADO 〕──╮\n┃ ${name} ya puede hablar libremente.\n┃ El protocolo de silencio ha sido levantado.\n╰────────────────────────────────╯`,
      await card(thumbUnmute, 'Silencio levantado'),
      null,
      { mentions: [target] }
    )
  }
}

handler.command = ['mute', 'unmute']
handler.help = ['mute @usuario', 'unmute @usuario']
handler.tags = ['group']
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler
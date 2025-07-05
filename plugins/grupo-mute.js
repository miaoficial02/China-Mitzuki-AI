import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, isAdmin, quoted, mentionedJid }) => {
  if (!isAdmin) return m.reply('🍬 Solo *administradores* pueden usar este comando.')

  const target =
    mentionedJid?.[0] ||
    quoted?.sender ||
    (/^\d{7,}$/.test(text) ? text.trim() + '@s.whatsapp.net' : null)

  if (!target) return m.reply('🎯 *Debes mencionar, responder o escribir el número del usuario.*')

  const creator = global.owner?.[0]?.[0] + '@s.whatsapp.net'
  const isOwner = target === creator
  const isBot = target === conn.user.jid

  if (isOwner) return m.reply('🔐 *No puedes mutear al creador del bot.*')
  if (isBot) return m.reply('🤖 *No puedes silenciar al propio bot.*')

  const name = (await conn.getName(target).catch(() => null)) || 'usuario desconocido'
  const user = global.db.data.users[target] ||= {}

  const buildCard = async (title, img) => ({
    key: { participants: '0@s.whatsapp.net', fromMe: false, id: '🔇Card' },
    message: {
      locationMessage: {
        name: title,
        jpegThumbnail: await (await fetch(img)).buffer()
      }
    }
  })

  if (command === 'mute') {
    if (user.muted) return m.reply('🍭 *Este usuario ya está muteado.*')
    user.muted = true

    return conn.reply(
      m.chat,
      `╭──〔 🔇 USUARIO MUTEADO 〕──╮\n` +
      `┃ ${name} ha sido *silenciado.*\n` +
      `┃ Sus mensajes serán eliminados.\n` +
      `╰────────────────────────────╯`,
      await buildCard('Usuario silenciado', 'https://telegra.ph/file/f8324d9798fa2ed2317bc.png'),
      null,
      { mentions: [target] }
    )
  }

  if (command === 'unmute') {
    if (!user.muted) return m.reply('🍭 *Ese usuario no está muteado.*')
    user.muted = false

    return conn.reply(
      m.chat,
      `╭──〔 🔊 USUARIO DESMUTEADO 〕──╮\n` +
      `┃ ${name} ha sido *desmuteado.*\n` +
      `┃ Ya puede hablar libremente 😌\n` +
      `╰────────────────────────────╯`,
      await buildCard('Usuario desmuteado', 'https://telegra.ph/file/aea704d0b242b8c41bf15.png'),
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
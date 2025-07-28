let handler = async (m, { conn, isROwner, isOwner, isAdmin }) => {
  let rol = '👤 Usuario normal'
  if (isAdmin) rol = '👑 Administrador de grupo'
  if (isOwner) rol = '🌙 Creador del bot'
  if (isROwner) rol = '🌌 Root Owner (Máximo Creador)'

  conn.reply(m.chat, `╭━━━〔 🌸 VERIFICACIÓN 🌸 〕━━━╮
┃  Hola ${m.pushName}
┃
┃  🔑 Reconocimiento: ${rol}
╰━━━━━━━━━━━━━━━━━━━━╯`, m)
}

handler.command = /^soyowner$/i
export default handler
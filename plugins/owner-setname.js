let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply(
      `🌙 *Debes indicar el nuevo nombre para Shizuka.*\n` +
      `📝 *Formato sugerido:* #setname NombrePrincipal/TextoSecundario`
    )
  }

  const names = text.split('/')
  if (names.length !== 2) {
    return m.reply(
      `⚠️ *Formato incorrecto.*\n` +
      `🌸 Por favor, usa una barra (/) para separar el nombre y el texto.\n` +
      `📎 Ejemplo: Shizuka/Mi luz entre códigos`
    )
  }

  global.botname = names[0].trim()
  const texto1bot = ` • Powered By ${etiqueta}`
  global.textbot = `${names[1].trim()}${texto1bot}`

  m.reply(
    `🎐 *Transformación completada.*\n\n` +
    `🪷 *Nombre principal cambiado a:* ${global.botname}\n` +
    `📜 *Frase representativa actualizada a:*\n${global.textbot}`
  )
}

handler.help = ['setname']
handler.tags = ['tools']
handler.command = ['setname']
handler.rowner = true

export default handler
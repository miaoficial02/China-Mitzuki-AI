let handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `🌙 *Por favor, escribe la nueva biografía que deseas que Shizuka exprese.*`,
      m
    )
  }

  try {
    await conn.updateProfileStatus(text).catch(_ => _)
    await conn.reply(
      m.chat,
      `🌸 *Biografía actualizada con éxito.*\n🦢 *Shizuka ahora refleja tu nuevo mensaje interior.*`,
      m
    )
  } catch (e) {
    throw '🌀 *Hubo un pequeño error en el camino...*'
  }
}

handler.help = ['setstatus <texto>']
handler.tags = ['owner']
handler.command = ['setstatus', 'setbio']
handler.rowner = true

export default handler
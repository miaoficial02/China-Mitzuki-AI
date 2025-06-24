import axios from "axios"

let handler = async (m, { conn, args }) => {
  try {
    let id = args?.[0]?.match(/\d+\-\d+@g.us/)?.[0] || m.chat

    const mensajes = Object.values(conn.chats[id]?.messages || {})
    const participantesUnicos = mensajes
      .map(msg => msg?.key?.participant)
      .filter((v, i, a) => v && a.indexOf(v) === i)

    const participantesOrdenados = participantesUnicos
      .sort((a, b) => a.split("@")[0].localeCompare(b.split("@")[0]))

    const listaEnLinea = participantesOrdenados.length
      ? participantesOrdenados.map(p => `🌐 *@${p.split("@")[0]}*`).join("\n")
      : "✧ No hay usuarios activos o en línea en este momento."

    await conn.sendMessage(
      m.chat,
      {
        text: `🎀 *Sistema Shizuka - Escaneo de Presencia en Línea*\n\n${listaEnLinea}\n\n🌸 _Información procesada con elegancia._`,
        contextInfo: {
          mentionedJid: participantesOrdenados
        }
      },
      { quoted: m }
    )

    await m.react("🌐")
  } catch (error) {
    console.error(error)
    await m.reply(
      `🚨 *Shizuka detectó un fallo en la operación.*\n\n📄 Detalles: ${error.message}\n\n🔧 Verifica que el grupo esté activo y que tenga mensajes recientes para escanear participación.`
    )
  }
}

handler.help = ["listonline"]
handler.tags = ["owner"]
handler.command = ["listonline", "online", "linea", "enlinea"]
handler.group = true

export default handler
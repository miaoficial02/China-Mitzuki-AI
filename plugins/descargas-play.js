import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔎 *Ingresa el nombre de la canción o artista que deseas buscar.*`, m)
  }

  try {
    const search = await yts(text)
    const video = search?.videos?.[0]
    if (!video) {
      return conn.reply(m.chat, `❌ *No se encontraron resultados para:* "${text}"`, m)
    }

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const canal = author?.name || "Desconocido"
    const info = `
🎶 *${title}*
👤 *Canal:* ${canal}
👁️ *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📅 *Publicado:* ${ago}
🔗 *Link:* ${url}
    `.trim()

    const thumb = (await conn.getFile(thumbnail))?.data

    await conn.sendMessage(m.chat, { text: info, contextInfo: {
      externalAdReply: {
        title: "🎧 Shizuka Music",
        body: "Tu descarga está en camino",
        mediaType: 1,
        previewType: 0,
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true,
      }
    }}, { quoted: m })

    const api = await (await fetch(`https://api.vreden.my.id/api/ytplaymp3?query=${url}`)).json()
    const audioUrl = api.result?.download?.url
    const audioTitle = api.result?.title || "audio"

    if (!audioUrl) throw new Error("No se pudo obtener el enlace de audio.")

    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      fileName: `${audioTitle}.mp3`,
      mimetype: "audio/mpeg"
    }, { quoted: m })

  } catch (err) {
    console.error("💥 Error en play:", err)
    return conn.reply(m.chat, `⚠️ *Ocurrió un problema al procesar tu solicitud.*\n${err}`, m)
  }
}

handler.command = /^play$/i
handler.tags = ["descargas"]
handler.help = ["play <nombre o link de video>"]
export default handler

function formatViews(views) {
  if (!views) return "0"
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B"
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M"
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k"
  return views.toString()
}
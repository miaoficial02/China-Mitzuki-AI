import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué deseas escuchar?*\nIngresa el nombre de la canción o artista.`, m)
  }

  try {
    // Mensaje de espera mientras busca
    await conn.sendMessage(m.chat, {
      text: `⌛ *Espera un momento...*\nShizuka está buscando tu melodía entre las estrellas 🌟`,
      contextInfo: {
        externalAdReply: {
          title: 'Buscando tu canción...',
          body: '🎧 Afina el oído... el ritmo ya viene',
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: false,
        },
      },
    }, { quoted: m })

    // Búsqueda YouTube
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
📊 *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📆 *Publicado:* ${ago}
🔗 *Link:* ${url}

✨ Tu música está en camino. Relájate y deja que Shizuka la traiga 🎧
`.trim()

    const thumb = (await conn.getFile(thumbnail))?.data

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎧 Shizuka Music",
          body: "Descargando desde el multiverso de APIs...",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m })

    // Intentar descarga por APIs múltiples
    const audio = await intentarDescargaDesdeApis(url)
    if (!audio) throw new Error("Ninguna API respondió correctamente.")

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${title}.mp3`,
      mimetype: "audio/mpeg"
    }, { quoted: m })

  } catch (err) {
    console.error("🎧 Error en 'play':", err)
    return conn.reply(m.chat, `❌ *No se pudo obtener el audio.*\n🚫 ${err}`, m)
  }
}

handler.command = /^play$/i
handler.tags = ["descargas"]
handler.help = ["play <nombre o link de video>"]
export default handler

// 🌐 Descarga MP3 desde múltiples APIs
async function intentarDescargaDesdeApis(videoUrl) {
  const apis = [
    (url) => `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(url)}`,
    (url) => `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(url)}`,
    (url) => `https://apis-starlights-team.koyeb.app/starlight/youtube-mp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.lolhuman.xyz/api/ytaudio?apikey=b8d3bec7f13fa5231ba88431&url=${encodeURIComponent(url)}`,
    (url) => `https://api.ryzumi.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`,
  ]

  for (const construir of apis) {
    try {
      const res = await fetch(construir(videoUrl))
      const json = await res.json()

      const url =
        json?.result?.download?.url ||
        json?.result?.link ||
        json?.result?.url ||
        json?.url ||
        json?.data?.url

      if (url && url.includes("http")) {
        return { url }
      }
    } catch (e) {
      console.warn("🔁 Una API falló, intentando siguiente...")
    }
  }

  return null
}

// 🔢 Formateo de vistas
function formatViews(views) {
  if (!views) return "0"
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B"
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M"
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k"
  return views.toString()
}
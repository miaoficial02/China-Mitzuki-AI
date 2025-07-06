import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué video deseas descargar?*\nEscribe el nombre o link del video.`, m)
  }

  try {
    // ⏳ Mensaje de espera con imagen personalizada
    await conn.sendMessage(m.chat, {
      text: `⏳ *Buscando tu video...*\nShizuka está rastreando las estrellas de YouTube 🌌`,
      contextInfo: {
        externalAdReply: {
          title: "Cazando video interestelar...",
          body: "📡 Sintonizando en HD",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    const busqueda = await yts(text)
    const video = busqueda?.videos?.[0]
    if (!video) return conn.reply(m.chat, `❌ *No se encontró ningún video para:* "${text}"`, m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const canal = author?.name || "Desconocido"
    const thumb = (await conn.getFile(thumbnail))?.data

    const info = `
🎥 *${title}*
👤 *Canal:* ${canal}
📊 *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📆 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

🎬 Preparando la mejor calidad posible... paciencia, por favor 🛠️
`.trim()

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "🧩 Descargando en la mejor calidad disponible",
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          previewType: 0,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    const resultado = await obtenerVideoEnMejorCalidad(url)
    if (!resultado?.url) throw new Error("No se encontró ningún enlace válido para este video.")

    await conn.sendFile(m.chat, resultado.url, `${title}.mp4`, `🎥 *${title}*\n📺 Calidad: ${resultado.calidad || "desconocida"}`, m)

  } catch (err) {
    console.error("❌ Error en play2:", err)
    return conn.reply(m.chat, `🚫 *No pude descargar el video.*\n${err}`, m)
  }
}

handler.command = /^play2|ytv|ytmp4|mp4$/i
handler.tags = ["descargas"]
handler.help = ["play2 <nombre o link del video>"]
export default handler

// 🛰️ Fallback entre múltiples APIs para obtener el mejor MP4 disponible
async function obtenerVideoEnMejorCalidad(videoUrl) {
  const endpoints = [
    `https://api.alyabot.xyz:3269/download_video?url=${encodeURIComponent(videoUrl)}`,
    `https://api2.alyabot.xyz:5216/download_video?url=${encodeURIComponent(videoUrl)}`,
    `https://api3.alyabot.xyz/download_video?url=${encodeURIComponent(videoUrl)}`
  ]

  const calidadPreferida = ["1080p", "hd", "720p", "HD", "480p", "360p"]

  for (const api of endpoints) {
    try {
      const res = await fetch(api)
      const json = await res.json()

      const disponibles = json?.result?.qualities || json?.qualities || {}

      for (const key of calidadPreferida) {
        if (disponibles[key]) return { url: disponibles[key], calidad: key }
      }

      // Si no hay estructura de calidad, toma el enlace directo si existe
      const fallback =
        json?.download_url ||
        json?.result?.url ||
        json?.url ||
        json?.data?.url

      if (fallback?.startsWith("http")) return { url: fallback, calidad: "desconocida" }

    } catch (e) {
      console.warn("⚠️ Falló una API, intentando la siguiente...");
    }
  }

  return null
}

// 📈 Formato de vistas con estilo
function formatViews(views) {
  if (!views) return "0"
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B"
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M"
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k"
  return views.toString()
}
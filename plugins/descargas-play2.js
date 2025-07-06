import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔎 *¿Qué video deseas descargar?*\nEscribe el nombre o link del video.`, m)
  }

  try {
    // 🌠 Mensaje de espera con imagen de Shizuka
    await conn.sendMessage(m.chat, {
      text: `⏳ *Buscando tu video...*\nShizuka está revisando los canales del universo 📡`,
      contextInfo: {
        externalAdReply: {
          title: "Cazando videos galácticos...",
          body: "🚀 Prepara las palomitas...",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // 🔎 Buscar en YouTube
    const busqueda = await yts(text)
    const video = busqueda?.videos?.[0]
    if (!video) return conn.reply(m.chat, `❌ *No se encontró ningún video para:* "${text}"`, m)

    const { title, thumbnail, timestamp, views, ago, url, author } = video
    const canal = author?.name || "Desconocido"

    const datos = `
🎥 *${title}*
👤 *Canal:* ${canal}
⏱️ *Duración:* ${timestamp}
📊 *Vistas:* ${formatViews(views)}
📆 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

🎬 Tu video está listo. Shizuka lo está preparando en HD 💫
`.trim()

    const thumb = (await conn.getFile(thumbnail))?.data

    await conn.sendMessage(m.chat, {
      text: datos,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "Preparando el MP4 en alta calidad...",
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          previewType: 0,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // 💾 Buscar video desde múltiples APIs
    const resultado = await buscarVideoDesdeApis(url)
    if (!resultado) throw new Error("Ninguna API pudo proporcionar el archivo MP4.")

    await conn.sendFile(m.chat, resultado.url, `${title}.mp4`, `🎬 *${title}*`, m)

  } catch (err) {
    console.error("💥 Error en play2:", err)
    return conn.reply(m.chat, `⚠️ *No fue posible obtener el video.*\n🔧 ${err}`, m)
  }
}

handler.command = /^play2|ytv|ytmp4|mp4$/i
handler.tags = ["descargas"]
handler.help = ["play2 <nombre o link del video>"]
export default handler

// 🌐 Fallback de APIs para descargar video MP4
async function buscarVideoDesdeApis(videoUrl) {
  const apis = [
    (url) => `https://api.alyabot.xyz:3269/download_video?url=${encodeURIComponent(url)}`,
    (url) => `https://api2.alyabot.xyz:5216/download_video?url=${encodeURIComponent(url)}`,
    (url) => `https://api3.alyabot.xyz/download_video?url=${encodeURIComponent(url)}`
  ]

  for (const construir of apis) {
    try {
      const res = await fetch(construir(videoUrl))
      const json = await res.json()

      const link = json?.result?.url || json?.url || json?.data?.url
      if (link && link.includes("http")) return { url: link }
    } catch (e) {
      console.warn("🔁 API de video fallida, intentando otra...")
    }
  }

  return null
}

// 📈 Formato de vistas
function formatViews(views) {
  if (!views) return "0"
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B"
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M"
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k"
  return views.toString()
}
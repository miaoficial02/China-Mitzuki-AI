import fetch from "node-fetch"
import yts from "yt-search"

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔎 *¿Qué video deseas descargar?*\nEscribe el nombre o link del video.`, m)
  }

  try {
    // 🌠 Espera visual con miniatura personalizada
    await conn.sendMessage(m.chat, {
      text: `⏳ *Shizuka está buscando tu video...*\n🔭 Recolectando píxeles en la galaxia 🎬`,
      contextInfo: {
        externalAdReply: {
          title: "Buscando tu video...",
          body: "🌌 En sintonía con la red estelar",
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

📦 Espera un poco... Shizuka ya está descargando tu video 🎬
`.trim()

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "✨ Empacando el archivo MP4 para ti",
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          previewType: 0,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

    // 📥 Buscar video desde múltiples APIs AlyaBot
    const resultado = await obtenerDesdeAlya(url)
    if (!resultado) throw new Error("Ninguna API pudo generar el video.")

    await conn.sendFile(m.chat, resultado.url, `${title}.mp4`, `🎬 *${title}*`, m)

  } catch (err) {
    console.error("❌ Error en play2:", err)
    return conn.reply(m.chat, `🚫 *Ocurrió un problema al descargar el video.*\n🛠️ ${err}`, m)
  }
}

handler.command = /^play2|ytv|ytmp4|mp4$/i
handler.tags = ["descargas"]
handler.help = ["play2 <nombre o link del video>"]
export default handler

// 🌐 Descargar video desde múltiples servidores Alya
async function obtenerDesdeAlya(videoUrl) {
  const endpoints = [
    (url) => `https://api.alyabot.xyz:3269/download_video?url=${encodeURIComponent(url)}`,
    (url) => `https://api2.alyabot.xyz:5216/download_video?url=${encodeURIComponent(url)}`,
    (url) => `https://api3.alyabot.xyz/download_video?url=${encodeURIComponent(url)}`
  ]

  for (const getUrl of endpoints) {
    try {
      const res = await fetch(getUrl(videoUrl))
      const json = await res.json()

      const enlace = json?.download_url || json?.url || json?.result?.url || json?.data?.url
      if (enlace && enlace.startsWith("http")) return { url: enlace }

    } catch (e) {
      console.warn("⚠️ API sin respuesta. Probando siguiente...");
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
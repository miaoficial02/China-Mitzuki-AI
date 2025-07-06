import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔎 *¿Qué video deseas descargar?*\nEscribe el nombre o enlace.`, m);
  }

  try {
    await conn.sendMessage(m.chat, {
      text: `⏳ *Buscando tu video...*\nShizuka está sondeando las dimensiones de YouTube 🌌`,
      contextInfo: {
        externalAdReply: {
          title: "Buscando en 720p...",
          body: "🔧 Ensamblando tu MP4 con calidad HD",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    const busqueda = await yts(text);
    const video = busqueda?.videos?.[0];
    if (!video) return conn.reply(m.chat, `❌ *No se encontró ningún video para:* "${text}"`, m);

    const { title, thumbnail, timestamp, views, ago, url, author } = video;
    const canal = author?.name || "Desconocido";
    const thumb = (await conn.getFile(thumbnail))?.data;

    const info = `
🎥 *${title}*
👤 *Canal:* ${canal}
📊 *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📆 *Publicado:* ${ago}
🔗 *Enlace:* ${url}

📽️ Shizuka está preparando la versión 720p para ti...
`.trim();

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "Descarga optimizada en calidad 720p",
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          previewType: 0,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    const resultado = await obtenerVideoEn720p(url);
    if (!resultado) throw new Error("No se encontró un enlace válido en calidad 720p.");

    await conn.sendFile(m.chat, resultado.url, `${title}.mp4`, `🎬 *${title}*`, m);

  } catch (err) {
    console.error("❌ Error en play2:", err);
    return conn.reply(m.chat, `🚫 *No pude procesar el video.*\n${err}`, m);
  }
};

handler.command = /^play2|ytmp4|ytv|mp4$/i;
handler.tags = ["descargas"];
handler.help = ["play2 <video>"];
export default handler;

async function obtenerVideoEn720p(videoUrl) {
  const endpoints = [
    `https://api.alyabot.xyz:3269/download_video?url=${encodeURIComponent(videoUrl)}`,
    `https://api2.alyabot.xyz:5216/download_video?url=${encodeURIComponent(videoUrl)}`,
    `https://api3.alyabot.xyz/download_video?url=${encodeURIComponent(videoUrl)}`
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();

      // Verifica si hay enlaces de calidad disponibles
      const calidades = json?.result?.qualities || json?.qualities || {};
      const prioridad = ["720p", "hd", "HD"];

      for (const q of prioridad) {
        if (calidades[q]) return { url: calidades[q] };
      }

      // Como fallback, busca cualquier enlace directo
      const fallback =
        json?.download_url ||
        json?.result?.url ||
        json?.url ||
        json?.data?.url;

      if (fallback && fallback.startsWith("http")) return { url: fallback };

    } catch (e) {
      console.warn("⚠️ API de video no respondió:", e.message);
    }
  }

  return null;
}

function formatViews(views) {
  if (!views) return "0";
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B";
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M";
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k";
  return views.toString();
}
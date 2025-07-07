import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué deseas escuchar?*\nEscribe el nombre de la canción o artista.`, m);
  }

  try {
    // 🕒 Espera visual con miniatura de Shizuka
    await conn.sendMessage(m.chat, {
      text: `⌛ *Espera un momento...*\nShizuka está buscando tu melodía entre las estrellas 🌌`,
      contextInfo: {
        externalAdReply: {
          title: "Buscando tu canción...",
          body: "🎧 Afinando la frecuencia musical",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // 🔎 Búsqueda en YouTube
    const search = await yts(text);
    const video = search?.videos?.[0];
    if (!video) return conn.reply(m.chat, `❌ *No encontré resultados para:* "${text}"`, m);

    const { title, thumbnail, timestamp, views, ago, url, author } = video;
    const canal = author?.name || "Desconocido";

    // 🎼 Detalles del video
    const info = `
🎶 *${title}*
👤 *Canal:* ${canal}
📊 *Vistas:* ${formatViews(views)}
⏱️ *Duración:* ${timestamp}
📆 *Publicado:* ${ago}
🔗 *Link:* ${url}

✨ Quédate cerca... Shizuka está preparando tu audio 🎧
`.trim();

    const thumb = (await conn.getFile(thumbnail))?.data;

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎵 Shizuka Music",
          body: "Descargando tu MP3 con estilo",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // 🚀 Buscar MP3 en cascada
    const audio = await intentarDescargaDesdeApis(url);
    if (!audio) throw new Error("Ninguna API respondió correctamente.");

    await conn.sendMessage(m.chat, {
      audio: { url: audio.url },
      fileName: `${title}.mp3`,
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (err) {
    console.error("🎧 Error en /play:", err);
    return conn.reply(m.chat, `❌ *No se pudo obtener el audio.*\n🔧 ${err}`, m);
  }
};

handler.command = /^play$/i;
handler.tags = ["descargas"];
handler.help = ["play <nombre o link de video>"];
export default handler;

// 🎚️ Fallback de descarga MP3 por múltiples APIs
async function intentarDescargaDesdeApis(videoUrl) {
  const apis = [
    (url) => `https://api.vreden.my.id/api/ytplaymp3?query=${encodeURIComponent(url)}`,
    (url) => `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.starlights.uk/api/downloader/youtube?url=${encodeURIComponent(url)}`,
    (url) => `https://apis-starlights-team.koyeb.app/starlight/youtube-mp3?url=${encodeURIComponent(url)}`,
    (url) => `https://api.lolhuman.xyz/api/ytaudio?apikey=b8d3bec7f13fa5231ba88431&url=${encodeURIComponent(url)}`,
    (url) => `https://api.ryzumi.vip/api/downloader/ytmp3?url=${encodeURIComponent(url)}`,
  ];

  for (const construir of apis) {
    try {
      const res = await fetch(construir(videoUrl));
      const json = await res.json();

      const enlace =
        json?.result?.download?.url ||
        json?.result?.link ||
        json?.result?.url ||
        json?.url ||
        json?.data?.url;

      if (enlace && enlace.startsWith("http")) {
        return { url: enlace };
      }
    } catch (e) {
      console.warn("⚠️ API sin respuesta, probando otra...");
    }
  }

  return null;
}

// 📈 Formatear vistas
function formatViews(views) {
  if (!views) return "0";
  if (views >= 1e9) return (views / 1e9).toFixed(1) + "B";
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M";
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "k";
  return views.toString();
}
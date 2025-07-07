import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué deseas escuchar?*\nEscribe el nombre de la canción o artista.`, m);
  }

  try {
    // 🎬 Animación inicial
    await conn.sendMessage(m.chat, {
      text: `🎧 *Buscando en Spotify...*\nShizuka está ajustando la aguja del tocadiscos 🎶`,
      contextInfo: {
        externalAdReply: {
          title: "Explorando Spotify",
          body: "🔎 Afinando tu frecuencia musical",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://open.spotify.com",
          sourceUrl: "https://open.spotify.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // 🔎 Buscar canción
    const search = await fetch(`https://api.dorratz.com/spotifysearch?query=${encodeURIComponent(text)}`);
    const result = await search.json();
    const track = result?.data?.[0];

    if (!track) return conn.reply(m.chat, `❌ *No se encontró nada en Spotify con:* "${text}"`, m);

    const { name: title, artists, url: trackUrl, image } = track;
    const artist = artists || "Desconocido";

    // 📩 Mostrar detalles
    await conn.sendMessage(m.chat, {
      text: `🎶 *${title}*\n👤 *Artista:* ${artist}\n🔗 *Enlace:* ${trackUrl}\n\n⏳ Descargando MP3...`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `🎤 ${artist}`,
          mediaType: 1,
          previewType: 0,
          mediaUrl: trackUrl,
          sourceUrl: trackUrl,
          thumbnailUrl: image,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // 🎵 Descargar MP3
    const dl = await fetch(`https://api.dorratz.com/spotifydl?url=${encodeURIComponent(trackUrl)}`);
    const json = await dl.json();
    const audioUrl = json?.download_url || json?.url;

    if (!audioUrl) throw new Error("No se obtuvo enlace de descarga.");

    try {
      // 📡 Enviar por URL
      await conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } catch (e) {
      // 🛟 Fallback con buffer
      const res = await fetch(audioUrl);
      const buffer = await res.buffer();

      await conn.sendMessage(m.chat, {
        audio: buffer,
        fileName: `${title}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });
    }

  } catch (err) {
    console.error("🎧 Error con Spotify:", err);
    return conn.reply(m.chat, `❌ *Error al obtener el audio.*\n🔧 ${err.message}`, m);
  }
};

handler.command = /^play = ["descargas"];
handler.help = ["play <nombre o artista>"];
export default handler;
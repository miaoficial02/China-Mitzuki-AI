import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué deseas escuchar?*\nEscribe el nombre de la canción o artista.`, m);
  }

  try {
    // 🎶 Animación inicial
    await conn.sendMessage(m.chat, {
      text: `🎧 *Buscando en Spotify...*\nShizuka está explorando nuevas vibras para ti 🌐`,
      contextInfo: {
        externalAdReply: {
          title: "Explorando Spotify",
          body: "🎼 Encontrando tu ritmo",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://open.spotify.com",
          sourceUrl: "https://open.spotify.com",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // 🔎 Buscar canción en Spotify
    const search = await fetch(`https://api.dorratz.com/spotifysearch?query=${encodeURIComponent(text)}`);
    const result = await search.json();
    const track = result?.data?.[0];

    if (!track) return conn.reply(m.chat, `❌ *No se encontró nada en Spotify con:* "${text}"`, m);

    const { title, artists, url: trackUrl, image } = track;
    const artist = artists?.join(", ") || "Desconocido";

    await conn.sendMessage(m.chat, {
      text: `🎶 *${title}*\n👤 *Artista:* ${artist}\n🔗 *Link:* ${trackUrl}\n\n🎧 Preparando el MP3...`,
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

    // 🎵 Descargar desde la API de descarga
    const dl = await fetch(`https://api.dorratz.com/spotifydl?url=${encodeURIComponent(trackUrl)}`);
    const json = await dl.json();

    if (!json?.url) throw new Error("No se pudo descargar el MP3 desde Spotify.");

    await conn.sendMessage(m.chat, {
      audio: { url: json.url },
      fileName: `${title}.mp3`,
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (err) {
    console.error("🎧 Error con Spotify:", err);
    conn.reply(m.chat, `❌ *Error al obtener el audio desde Spotify.*\n🔧 ${err}`, m);
  }
};

handler.command = /^play$/i;
handler.tags = ["descargas"];
handler.help = ["play <nombre o artista>"];
export default handler;
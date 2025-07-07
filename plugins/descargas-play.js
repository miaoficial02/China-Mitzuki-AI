import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  if (!text.trim()) {
    return conn.reply(m.chat, `🔍 *¿Qué deseas escuchar?*\nEscribe el nombre del artista o canción de SoundCloud.`, m);
  }

  try {
    // 🎬 Mensaje inicial visual
    await conn.sendMessage(m.chat, {
      text: `🎶 *Buscando en SoundCloud...*\nShizuka está sumergida en ondas musicales 🌊`,
      contextInfo: {
        externalAdReply: {
          title: "Explorando SoundCloud",
          body: "🎧 Vibraciones en sintonía",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://soundcloud.com/",
          sourceUrl: "https://soundcloud.com/",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/main/Shizuka.jpg",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // 🔎 Buscar canción
    const searchRes = await fetch(`https://delirius-apiofc.vercel.app/search/soundcloud?q=${encodeURIComponent(text)}&limit=1`);
    const searchJson = await searchRes.json();
    const song = searchJson?.datos?.[0];

    if (!song || !song.enlace) {
      return conn.reply(m.chat, `❌ *No se encontró ninguna canción llamada:* "${text}"`, m);
    }

    const { título, artista, enlace, duración, image } = song;

    await conn.sendMessage(m.chat, {
      text: `🎵 *${título}*\n👤 *Artista:* ${artista}\n⏱️ *Duración:* ${(duración / 1000 / 60).toFixed(2)} min\n🔗 *Link:* ${enlace}`,
      contextInfo: {
        externalAdReply: {
          title: título,
          body: `🎤 ${artista}`,
          mediaType: 1,
          previewType: 0,
          mediaUrl: enlace,
          sourceUrl: enlace,
          thumbnailUrl: image || "https://raw.githubusercontent.com/Kone457/Nexus/main/Shizuka.jpg",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // 🎵 Descargar MP3
    const dlRes = await fetch(`https://delirius-apiofc.vercel.app/download/soundcloud?url=${encodeURIComponent(enlace)}`);
    const dlJson = await dlRes.json();
    const audioUrl = dlJson?.datos?.url;

    if (!audioUrl) throw new Error("No se pudo obtener el enlace de descarga.");

    try {
      // Opción directa con stream por URL
      await conn.sendMessage(m.chat, {
        audio: { url: audioUrl },
        fileName: `${título}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });

    } catch (e) {
      // Fallback si falla el envío directo
      const res = await fetch(audioUrl);
      const buffer = await res.buffer();

      await conn.sendMessage(m.chat, {
        audio: buffer,
        fileName: `${título}.mp3`,
        mimetype: "audio/mpeg"
      }, { quoted: m });
    }

  } catch (err) {
    console.error("🎧 Error en SoundCloud:", err);
    conn.reply(m.chat, `❌ *No se pudo completar la descarga.*\n🔧 ${err.message}`, m);
  }
};

handler.command = /^play$/i;
handler.tags = ["descargas"];
handler.help = ["play <nombre o artista>"];
export default handler;
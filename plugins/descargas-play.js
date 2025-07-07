import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ").trim();
  if (!text) {
    return conn.reply(
      m.chat,
      `🔍 *¿Qué deseas escuchar de Spotify?*\n\n📌 Uso: *${usedPrefix + command} nombre de canción/artista*`,
      m
    );
  }

  // Enviando espera visual
  await conn.sendMessage(m.chat, {
    text: `🎧 *Buscando en Spotify...*\n\n⏳ Espera mientras encuentro la canción *${text}*`,
    contextInfo: {
      externalAdReply: {
        title: "Spotify Search 🎵",
        body: "Explorando los acordes digitales...",
        mediaType: 1,
        previewType: 0,
        mediaUrl: "https://spotify.com",
        sourceUrl: "https://spotify.com",
        thumbnailUrl: "https://i.scdn.co/image/ab67616d0000b27301ecf678f0f389a6ecdc7e48", // Puedes cambiar el thumbnail
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  try {
    const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result?.downloadUrl) {
      return conn.reply(m.chat, `❌ *No encontré resultados en Spotify para:* "${text}"`, m);
    }

    const { title, artist, duration, cover, url } = json.result.metadata;
    const audio = json.result.downloadUrl;

    const caption = `
🎶 *${title}*
👤 *Artista:* ${artist}
⏱️ *Duración:* ${duration}
🔗 *Spotify:* ${url}

✅ Tu música está lista. ¡Que la disfrutes!
`.trim();

    // Enviar imagen + detalles
    await conn.sendMessage(m.chat, {
      image: { url: cover },
      caption,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: `🎵 Artista: ${artist}`,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnailUrl: cover,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // Enviar audio MP3
    await conn.sendMessage(m.chat, {
      audio: { url: audio },
      fileName: `${title}.mp3`,
      mimetype: "audio/mp4",
      ptt: false
    }, { quoted: m });

  } catch (e) {
    console.error("⚠️ Error al procesar Spotify:", e);
    return conn.reply(m.chat, `⚠️ *Error al obtener el audio desde Spotify.*\n\n${e.message}`, m);
  }
};

handler.command = /^play$/i;
handler.tags = ['descargas'];
handler.help = ['play <nombre de canción/artista>'];
export default handler;
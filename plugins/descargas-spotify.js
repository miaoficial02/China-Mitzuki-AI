import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎵 *Escribe el nombre de una canción o pega el enlace de Spotify.*\nEjemplo:\n${usedPrefix + command} DJ Opus`,
      footer: '🔍 Buscar y descargar vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Spotify Downloader',
          body: 'Busca una canción por nombre o link',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  let trackUrl = text;
  const isSpotifyLink = text.includes('spotify.com/track');

  if (!isSpotifyLink) {
    try {
      const searchUrl = `https://api.vreden.my.id/api/spotifysearch?query=${encodeURIComponent(text)}`;
      const res = await fetch(searchUrl);
      const json = await res.json();
      const results = json?.result;

      if (!results || results.length === 0) {
        return m.reply(`❌ No se encontró ninguna canción para: ${text}`);
      }

      let found = false;

      for (let i = 0; i < Math.min(results.length, 5); i++) {
        const candidateLink = results[i]?.spotifyLink;
        const apiUrl = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(candidateLink)}`;
        const info = await fetch(apiUrl);
        const jsonTrack = await info.json();

        if (jsonTrack?.result?.status && jsonTrack?.result?.music) {
          trackUrl = candidateLink;
          found = true;
          break;
        }
      }

      if (!found) return m.reply(`⚠️ No se pudo obtener información válida de ninguno de los resultados para "${text}". Intenta con otro término.`);

    } catch (error) {
      console.error('🎯 Error durante la búsqueda:', error);
      return m.reply(`❌ Error al buscar el término: ${text}\n📛 ${error.message}`);
    }
  }

  try {
    const res = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(trackUrl)}`);
    const trackData = await res.json();
    const track = trackData.result;

    if (!track?.status || !track?.music) {
      return m.reply(`❌ No se pudo obtener datos válidos del track desde el enlace: ${trackUrl}`);
    }

    const buffer = await (await fetch(track.music)).buffer();

    await conn.sendMessage(m.chat, {
      image: { url: track.cover || thumbnailCard },
      caption: `🎶 *${track.title}*\n👤 Artista: ${track.artists}\n📀 Tipo: ${track.type}\n📅 Lanzamiento: ${track.releaseDate || 'No disponible'}\n🎧 Enviando audio...`,
      footer: '🎵 Extraído vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: track.title,
          body: 'Click para escuchar o descargar',
          thumbnailUrl: thumbnailCard,
          sourceUrl: track.music
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: buffer,
      mimetype: 'audio/mpeg',
      fileName: `${track.title}.mp3`
    }, { quoted: m });

  } catch (err) {
    console.error('💥 Error final:', err);
    m.reply(`⚠️ Error al procesar la canción.\n📛 ${err.message}`);
  }
};

handler.command = ['spotify', 'trackvreden', 'buscaspotify', 'songcard'];
export default handler;
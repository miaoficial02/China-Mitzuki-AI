import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎵 *Proporcióname el nombre de la canción o el enlace de Spotify.*\nEjemplo:\n${usedPrefix + command} DJ Opus`,
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
  }

  let trackUrl = text;

  if (!text.includes('spotify.com/track')) {
    // Buscar canción por nombre
    const searchUrl = `https://api.vreden.my.id/api/spotifysearch?query=${encodeURIComponent(text)}`;
    const res = await fetch(searchUrl);
    const json = await res.json();

    if (!json?.result || json.result.length === 0) {
      return m.reply('❌ No se encontró ninguna canción con ese nombre.');
    }

    trackUrl = json.result[0].spotifyLink;
  }

  try {
    const infoRes = await fetch(`https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(trackUrl)}`);
    const trackData = await infoRes.json();
    const track = trackData.result;

    if (!track?.status || !track.music) {
      return m.reply('❌ No se pudo obtener información del track desde el enlace.');
    }

    const audioBuffer = await (await fetch(track.music)).buffer();

    // Enviar info visual
    await conn.sendMessage(m.chat, {
      image: { url: track.cover || thumbnailCard },
      caption: `🎶 *${track.title}*\n👤 Artista: ${track.artists}\n📀 Tipo: ${track.type}\n📅 Lanzamiento: ${track.releaseDate || 'No disponible'}\n🎧 Enviando audio...`,
      footerida vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: track.title,
          body: 'Click para escuchar o descargar',
          thumbnailUrl: thumbnailCard,
          sourceUrl: track.music
        }
      }
    }, { quoted: m });

    // Enviar audio
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      fileName: `${track.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error al procesar:', error);
    m.reply(`⚠️ Ocurrió un error.\n📛 Detalles: ${error.message}`);
  }
};

handler.command = ['spotify', 'trackvreden', 'songcard', 'buscaspotify'];
export default handler;
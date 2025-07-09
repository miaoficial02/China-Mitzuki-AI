import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija tipo tarjeta

  if (!text || !text.includes('spotify.com/track')) {
    return conn.sendMessage(m.chat, {
      text: `🎵 *Proporcióname un enlace válido de Spotify.*\nEjemplo:\n${usedPrefix + command} https://open.spotify.com/track/XXXX`,
      footer: '🎧 Track Info por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Obteniendo info de Spotify',
          body: 'Escucha, descarga y disfruta',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    let api = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();
    let track = json.result;

    if (!track?.status || !track.music) {
      return m.reply(`❌ No se pudo obtener información para este track`);
    }

    const caption = `
🎵 *${track.title}*
👤 Artista: ${track.artists}
📀 Tipo: ${track.type}
📅 Lanzamiento: ${track.releaseDate || 'No disponible'}
🔗 [Descargar MP3](${track.music})
`;

    await conn.sendMessage(m.chat, {
      image: { url: track.cover },
      caption,
      footer: '🎶 Información obtenida vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: track.title,
          body: 'Click para escuchar o descargar',
          thumbnailUrl: thumbnailCard,
          sourceUrl: track.music
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`⚠️ Error al obtener datos del track.\n📛 Detalles: ${error.message}`);
    m.react('💥');
  }
};

handler.command = ['spotify', 'trackvreden', 'songcard'];
export default handler;
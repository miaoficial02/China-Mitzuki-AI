import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija para la tarjeta

  if (!text || !text.includes('spotify.com/track')) {
    return conn.sendMessage(m.chat, {
      text: `🎵 *Proporcióname un enlace válido de Spotify.*\nEjemplo:\n${usedPrefix + command} https://open.spotify.com/track/XXXX`,
      footer: '🎶 Plugin Spotify por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Track Info de Spotify',
          body: 'Usa enlaces de Spotify para ver y descargar música',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
  }

  try {
    const api = `https://api.vreden.my.id/api/spotify?url=${encodeURIComponent(text)}`;
    const res = await fetch(api);
    const json = await res.json();
    const track = json.result;

    if (!track?.status || !track.music) {
      return m.reply('❌ No se pudo obtener información del track. Verifica el enlace.');
    }

    const caption = `
🎵 *${track.title}*
👤 Artista: ${track.artists}
📀 Tipo: ${track.type}
📅 Lanzamiento: ${track.release'}
🔗 [Descargar MP3](${track.music})
`;

    await conn.sendMessage(m.chat, {
      image: { url: track.cover || thumbnailCard },
      caption,
      footer: '🎧 Info obtenida vía Vreden API',
      // Nota: esta sección ya no interfiere con la imagen
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
    console.error('💥 Error al obtener info:', error);
    m.reply(`⚠️ Ocurrió un error al recuperar el track.\n📛 Detalles: ${error.message}`);
    m.react('🛠️');
  }
};

handler.command = ['spotify', 'trackvreden', 'songcard'];
export default handler;
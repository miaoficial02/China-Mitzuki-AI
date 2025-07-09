import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🔎 *Escribe el nombre de un video para buscar en YouTube.*\nEjemplo:\n${usedPrefix + command} DJ Ambatukam`,
      footer: '📺 Búsqueda vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'YouTube Downloader',
          body: 'Busca y descarga videos en MP4',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    const searchRes = await fetch(`https://api.vreden.my.id/api/yts?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const videoList = searchJson?.result?.all;

    if (!videoList || !videoList.length) {
      return m.reply(`❌ No se encontraron videos para el término: ${text}`);
    }

    const selected = videoList[0];
    const downloadRes = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(selected.url)}`);
    const downloadJson = await downloadRes.json();
    const meta = downloadJson?.result?.metadata;
    const dl = downloadJson?.result?.download;

    if (!downloadJson?.status || !dl?.url) {
      return m.reply(`⚠️ No se pudo obtener el enlace de descarga para: ${selected.title}`);
    }

    const caption = `
📺 *${meta.title}*
🎙️ Autor: ${meta.author.name}
⏱️ Duración: ${meta.duration.timestamp}
👁️ Vistas: ${meta.views.toLocaleString()}
📝 Descripción: ${meta.description.slice(0, 200)}...
`;

    await conn.sendMessage(m.chat, {
      image: { url: meta.thumbnail || thumbnailCard },
      caption,
      footer: '🎥 Video obtenido vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: 'Click para ver o descargar en MP4',
          thumbnailUrl: thumbnailCard,
          sourceUrl: meta.url
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      video: { url: dl.url },
      mimetype: 'video/mp4',
      fileName: dl.filename || 'video.mp4'
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error en YouTube plugin:', error);
    m.reply(`❌ Error al procesar tu búsqueda.\n📛 ${error.message}`);
  }
};

handler.command = ['playvideo', 'ytmp4', 'buscayoutube'];
export default handler;
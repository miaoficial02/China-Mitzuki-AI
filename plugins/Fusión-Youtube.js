import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `🔎 *Escribe el nombre de un video para buscar en YouTube.*\nEjemplo:\n${usedPrefix + command} Empire funk`,
      footer: '📺 Búsqueda vía EliasarYT API',
      contextInfo: {
        externalAdReply: {
          title: 'YouTube MP4 Downloader',
          body: 'Busca y descarga videos fácilmente',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://eliasar-yt-api.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  await conn.sendMessage(m.chat, {
    text: '⏳ *Buscando tu video...*\n🔍 Por favor espera mientras se obtiene el resultado.',
    footer: '🧩 Preparando tu contenido con estilo',
    contextInfo: {
      externalAdReply: {
        title: 'Buscando en YouTube...',
        body: 'Esto tomará solo unos segundos',
        thumbnailUrl: thumbnailCard,
        sourceUrl: 'https://eliasar-yt-api.vercel.app'
      }
    }
  }, { quoted: m });

  try {
    // 🔍 Búsqueda vía EliasarYT
    const searchRes = await fetch(`https://eliasar-yt-api.vercel.app/api/search/youtube?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const videoList = searchJson?.results?.resultado;

    if (!videoList || !videoList.length) {
      return m.reply(`❌ No se encontraron videos para: ${text}`);
    }

    const selected = videoList[0];

    // 🎥 Descarga vía Vreden
    const downloadRes = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(selected.url)}`);
    const downloadJson = await downloadRes.json();
    const result = downloadJson?.result;
    const meta = result?.metadata;
    const dl = result?.download;

    if (!result?.status || !dl?.url) {
      return m.reply(`⚠️ No se pudo obtener el enlace de descarga para: ${selected.title}`);
    }

    // 📝 Info del video
    const caption = `
🎬 *${meta.title}*
🎙️ Autor: ${meta.author.name}
📅 Publicado: ${meta.ago}
⏱️ Duración: ${meta.timestamp}
👁️ Vistas: ${meta.views.toLocaleString()}
📝 ${meta.description.slice(0, 160)}...
📥 Calidad: ${dl.quality}
📄 Archivo: ${dl.filename}
`;

    // 🖼️ Enviar info visual
    await conn.sendMessage(m.chat, {
      image: { url: meta.thumbnail || thumbnailCard },
      caption,
      footer: '🎥 Video obtenido vía EliasarYT + Vreden API',
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: 'Click para ver o descargar',
          thumbnailUrl: meta.thumbnail,
          sourceUrl: selected.url
        }
      }
    }, { quoted: m });

    // 🎞️ Enviar el video MP4
    await conn.sendMessage(m.chat, {
      video: { url: dl.url },
      mimetype: 'video/mp4',
      fileName: dl.filename || 'video.mp4'
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error en YouTube plugin:', error);
    m.reply(`❌ Ocurrió un error al procesar tu solicitud.\n📛 ${error.message}`);
  }
};

handler.command = ['ytmp4', 'playvideo', 'buscayoutube'];
export default handler;
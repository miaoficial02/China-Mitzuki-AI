import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `🔎 *Escribe el nombre de un video para buscar en YouTube.*\nEjemplo:\n${usedPrefix + command} DJ Ambatukam`,
      footer: '📺 Búsqueda vía Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: 'YouTube Downloader',
          body: 'Busca y descarga videos en MP4',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.dorratz.com'
        }
      }
    }, { quoted: m });
    return;
  }

  await conn.sendMessage(m.chat, {
    text: '⏳ *Procesando tu búsqueda...*\n🔍 Por favor espera mientras se obtiene el video.',
    footer: '🧩 Delirius está preparando tu contenido',
    contextInfo: {
      externalAdReply: {
        title: 'Buscando en YouTube...',
        body: 'Esto puede tardar unos segundos',
        thumbnailUrl: thumbnailCard,
        sourceUrl: 'https://api.dorratz.com'
      }
    }
  }, { quoted: m });

  try {
    const searchRes = await fetch(`https://api.dorratz.com/v3/yt-search?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const videoList = searchJson?.data || searchJson?.result?.all;

    if (!videoList || !videoList.length) {
      return m.reply(`❌ No se encontraron videos para el término: ${text}`);
    }

    const selected = videoList[0];
    const downloadRes = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(selected.url)}`);
    const downloadJson = await downloadRes.json();
    const meta = downloadJson?.data;
    const dl = meta?.download;

    if (!downloadJson?.status || !dl?.url) {
      return m.reply(`⚠️ No se pudo obtener el enlace de descarga para: ${selected.title}`);
    }

    const caption = `
🎬 *${meta.title}*
🎙️ Autor: ${meta.author}
📁 Categoría: ${meta.category}
⏱️ Duración: ${meta.duration}s
👁️ Vistas: ${parseInt(meta.views).toLocaleString()}
👍 Likes: ${parseInt(meta.likes).toLocaleString()}
💬 Comentarios: ${parseInt(meta.comments).toLocaleString()}
📥 Calidad: ${dl.quality} — ${dl.size}
`;

    await conn.sendMessage(m.chat, {
      image: { url: meta.image_max_resolution || meta.image || thumbnailCard },
      caption,
      footer: '🎥 Video obtenido vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: meta.title,
          body: 'Click para ver o descargar en MP4',
          thumbnailUrl: meta.image || thumbnailCard,
          sourceUrl: selected.url
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
    m.reply(`❌ Ocurrió un error al procesar tu solicitud.\n📛 ${error.message}`);
  }
};

handler.command = ['playvideo', 'ytmp4', 'buscayoutube'];
export default handler;
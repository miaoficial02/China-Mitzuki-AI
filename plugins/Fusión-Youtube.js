import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    await conn.sendMessage(m.chat, {
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

  // Mensaje de espera visual 🕓
  await conn.sendMessage(m.chat, {
    text: '⏳ *Procesando tu búsqueda...*\n🔍 Por favor espera mientras se obtiene el video.',
    footer: '🧩 Vreden está preparando tu contenido',
    contextInfo: {
      externalAdReply: {
        title: 'Buscando en YouTube...',
        body: 'Esto puede tardar unos segundos',
        thumbnailUrl: thumbnailCard,
        sourceUrl: 'https://api.vreden.my.id'
      }
    }
  }, { quoted: m });

  try {
    const searchRes = await fetch(`https://api.dorratz.com/v3/yt-search?query=${encodeURIComponent(text)}`);
    const searchJson = await searchRes.json();
    const videoList = searchJson?.result?.all;

    if (!videoList || !videoList.length) {
      return m.reply(`❌ No se encontraron videos para el término: ${text}`);
    }

    const selected = videoList[0];
    const downloadRes = await fetch(`https://hexagate.darkcore.xyz/api/ytmp4?key=darkmes&url=${encodeURIComponent(selected.url)}`);
    const downloadJson = await downloadRes.json();
    const meta = downloadJson?.result?.metadata;
    const dl = downloadJson?.result?.download;

    if (!downloadJson?.status || !dl?.url) {
      return m.reply(`⚠️ No se pudo obtener el enlace de descarga para: ${selected.title}`);
    }

    const caption = `
🎬 *${meta.title}*
🎙️ Autor: ${meta.author.name}
📅 Publicado: ${meta.ago}
⏱️ Duración: ${meta.duration.timestamp}
👁️ Vistas: ${meta.views.toLocaleString()}
📝 ${meta.description.slice(0, 160)}...`;

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
    m.reply(`❌ Ocurrió un error al procesar tu solicitud.\n📛 ${error.message}`);
  }
};

handler.command = ['playvideo', 'ytmp4', 'buscayoutube'];
export default handler;
import fetch from 'node-fetch';

const DELIRIUS_API = 'https://delirius-apiofc.vercel.app/download/pinterestdl?url=';

const handler = async (m, { text, conn }) => {
  const DEFAULT_THUMB = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: '📌 *Proporcióname el enlace al pin de Pinterest.*',
      contextInfo: {
        externalAdReply: {
          title: '🔍 Esperando el enlace...',
          body: 'Debes incluir un enlace válido',
          thumbnailUrl: DEFAULT_THUMB,
          mediaType: 1,
          previewType: 0,
          mediaUrl: 'https://pinterest.com',
          sourceUrl: 'https://pinterest.com',
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }

  try {
    const res = await fetch(DELIRIUS_API + encodeURIComponent(text));
    if (!res.ok) throw new Error('Error de red al consultar la API');

    const json = await res.json();
    const pin = json.data;

    if (!pin || !pin.download?.url) {
      return conn.sendMessage(m.chat, {
        text: '🚫 *No se encontró contenido descargable en ese pin.*',
        contextInfo: {
          externalAdReply: {
            title: '❌ Pin inválido',
            body: 'Verifica el enlace',
            thumbnailUrl: DEFAULT_THUMB,
            mediaType: 1,
            previewType: 0,
            mediaUrl: text,
            sourceUrl: text,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });
    }

    const {
      title,
      description,
      thumbnail,
      upload,
      source,
      author_name,
      username,
      author_url,
      download
    } = pin;

    const info = `
🎬 *${title}*
👤 *Autor:* ${author_name} (${username})
🗓️ *Subido:* ${upload}
🔗 *Fuente:* ${source}
📝 *Descripción:* ${description || 'Sin descripción'}
`.trim();

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: '📌 Detalles del Pin',
          body: '🎁 Preparando el contenido',
          thumbnailUrl: thumbnail || DEFAULT_THUMB,
          mediaType: 1,
          previewType: 0,
          mediaUrl: source,
          sourceUrl: source,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      video: { url: download.url },
      caption: `🎥 *${title}* — cortesía de ${author_name}`,
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      contextInfo: {
        external title: '🎬 Video del Pin',
          body: '📥 Descargar completo',
          thumbnailUrl: thumbnail || DEFAULT_THUMB,
          mediaType: 1,
          previewType: 0,
          mediaUrl: download.url,
          sourceUrl: source,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('❌ Error en el plugin Pinterest:', error);
    return conn.sendMessage(m.chat, {
      text: `❌ *No se pudo procesar el pin.*\n${error.message}`,
      contextInfo: {
        externalAdReply: {
          title: '⚠️ Error inesperado',
          body: 'Vuelve a intentarlo más tarde',
          thumbnailUrl: DEFAULT_THUMB,
          mediaType: 1,
          previewType: 0,
          mediaUrl: 'https://pinterest.com',
          sourceUrl: 'https://pinterest.com',
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }
};

handler.command = /^pindl|pinterestdl$/i;
handler.help = ['pindl <enlace del pin>'];
handler.tags = ['descargas'];

export default handler;
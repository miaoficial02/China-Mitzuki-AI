import fetch from 'node-fetch';

const PINTEREST_API = 'https://api.vreden.my.id/api/download/pinterest?url=';

/**
 * Consulta el pin de Pinterest desde el API de Vreden
 * @param {string} url - Enlace del pin
 * @returns {Promise<Object|null>}
 */
async function fetchPinterestPin(url) {
  try {
    const res = await fetch(PINTEREST_API + encodeURIComponent(url));
    if (!res.ok) return null;
    const json = await res.json();
    return json?.result ? json.result : null;
  } catch (e) {
    console.error('⚠️ Error al consultar el pin:', e);
    return null;
  }
}

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: '📌 *Por favor, proporciona un enlace válido de Pinterest.*',
      contextInfo: {
        externalAdReply: {
          title: '🔎 Buscando contenido...',
          body: 'Esperando el pin...',
          thumbnailUrl: 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg',
          mediaType: 1,
          previewType: 0,
          mediaUrl: 'https://pinterest.com',
          sourceUrl: 'https://pinterest.com',
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }

  const pin = await fetchPinterestPin(text);
  if (!pin || !pin.media_urls?.length) {
    return conn.sendMessage(m.chat, {
      text: '🚫 *No se encontró contenido válido en el pin.*',
      contextInfo: {
        externalAdReply: {
          title: '❌ Pin no válido',
          body: 'Intenta con otro enlace',
          thumbnailUrl: 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg',
          mediaType: 1,
          previewType: 0,
          mediaUrl: 'https://pinterest.com',
          sourceUrl: 'https://pinterest.com',
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }

  const title = pin.title || 'Sin título';
  const color = pin.dominant_color || '#AAA';
  const thumb = pin.media_urls?.[1]?.url || pin.media_urls?.[0]?.url;

  const info = `
📍 *Título:* ${title}
🆔 *ID:* ${pin.id}
🎨 *Color Dominante:* ${color}
📅 *Fecha:* ${pin.created_at}
`.trim();

  await conn.sendMessage(m.chat, {
    text: info,
    contextInfo: {
      externalAdReply: {
        title: '📌 Información del Pin',
        body: '🎁 Detalles del contenido',
        thumbnailUrl: thumb,
        mediaType: 1,
        previewType: 0,
        mediaUrl: text,
        sourceUrl: text,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  for (const img of pin.media_urls) {
    await conn.sendMessage(m.chat, {
      image: { url: img.url },
      caption: `📎 *Imagen (${img.quality})* — ${img.size}`,
      contextInfo: {
        externalAdReply: {
          title: '📷 Imagen del Pin',
          body: `🖼️ Calidad: ${img.quality}`,
          thumbnailUrl: thumb,
          mediaType: 1,
          previewType: 0,
          mediaUrl: img.url,
          sourceUrl: text,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });
  }
};

handler.command = /^pinterestdl|pindl$/i;
handler.help = ['pinterest <enlace del pin>'];
handler.tags = ['descargas'];

export default handler;
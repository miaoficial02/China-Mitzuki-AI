import fetch from 'node-fetch';

const PINTEREST_API = 'https://api.vreden.my.id/api/download/pinterest?url=';

/**
 * Obtiene datos desde Pinterest usando el endpoint del servidor
 * @param {string} url - El enlace al pin de Pinterest
 * @returns {Promise<Object|null>} - El JSON con datos del pin o null si falla
 */
async function fetchPinterestPin(url) {
  try {
    const res = await fetch(PINTEREST_API + encodeURIComponent(url));
    if (!res.ok) return null;
    const json = await res.json();
    return json?.result?.status ? json.result : null;
  } catch (e) {
    console.error('⚠️ Error al obtener datos desde Pinterest:', e);
    return null;
  }
}

const handler = async (m, { text, conn }) => {
  if (!text) {
    return conn.reply(m.chat, `📌 *Proporcióname el enlace al pin de Pinterest.*`, m);
  }

  const pinData = await fetchPinterestPin(text);
  if (!pinData || !pinData.media_urls?.length) {
    return conn.reply(m.chat, '🚫 *No se encontró contenido válido en ese pin.*', m);
  }

  const title = pinData.title || 'Sin título';
  const color = pinData.dominant_color || '#888';
  const images = pinData.media_urls;
  const thumb = images[1]?.url || images[0]?.url;

  const info = `
🖼️ *${title}*
🆔 *ID:* ${pinData.id}
🎨 *Color dominante:* ${color}
🕒 *Fecha:* ${pinData.created_at}
`.trim();

  await conn.sendMessage(m.chat, {
    text: info,
    contextInfo: {
      externalAdReply: {
        title: '📌 Pin de Pinterest',
        body: '🎁 Aquí está el contenido visual',
        thumbnailUrl: thumb,
        mediaType: 1,
        previewType: 0,
        mediaUrl: text,
        sourceUrl: text,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  for (const img of images) {
    await conn.sendMessage(m.chat, {
      image: { url: img.url },
      caption: `📎 *Imagen (${img.quality})* — ${img.size}`,
    }, { quoted: m });
  }
};

handler.command = /^pinterestdl|pindl$/i;
handler.help = ['pinterest <enlace del pin>'];
handler.tags = ['descargas'];

export default handler;
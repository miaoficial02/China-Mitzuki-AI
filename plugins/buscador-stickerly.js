// 🧸 Buscador de Stickers Stickerly por Delirius API

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎀 *Escribe una palabra clave para buscar stickers.*\nEjemplo:\n${usedPrefix + command} My Melody`,
      footer: '🧩 Stickerly Finder por Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de Stickers',
          body: 'Explora paquetes desde Stickerly',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://sticker.ly'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://delirius-apiofc.vercel.app/search/stickerly?query=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    let packs = json.data;
    if (!Array.isArray(packs) || packs.length === 0) {
      return m.reply(`❌ No se encontraron paquetes para: ${text}`);
    }

    let pack = packs[0];
    let caption = `
🎀 *Nombre:* ${pack.name}
👤 *Autor:* ${pack.author}
📦 *Stickers:* ${pack.sticker_count}
👁️ *Vistas:* ${pack.view_count}
📤 *Exportados:* ${pack.export_count}
🎬 *Animado:* ${pack.isAnimated ? 'Sí' : 'No'}
🔗 *Stickerly:* ${pack.url}
`.trim();

    conn.sendMessage(m.chat, {
      image: { url: pack.preview },
      caption,
      footer: '🚀 Paquete obtenido vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: pack.name,
          body: `${pack.author} • ${pack.sticker_count} stickers`,
          thumbnailUrl: thumbnailCard,
          sourceUrl: pack.url
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener stickers.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['stickerlysearch', 'stickersly', 'mymelody'];
export default handler;
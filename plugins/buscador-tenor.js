// 🎞️ Buscador de GIFs de Nayeon por Delirius API

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎬 *Escribe una palabra clave para buscar GIFs de Nayeon.*\nEjemplo:\n${usedPrefix + command} nayeon`,
      footer: '🌀 Tenor Finder por Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de GIFs',
          body: 'Explora animaciones con estilo',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://tenor.com'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://delirius-apiofc.vercel.app/search/tenor?q=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    let results = json.data;
    if (!Array.isArray(results) || results.length === 0) {
      return m.reply(`❌ No se encontraron GIFs para: ${text}`);
    }

    let gif = results[0];
    let caption = `
🎀 *Descripción:* ${gif.title}
📅 *Fecha:* ${gif.created}
🔗 *Tenor:* ${gif.gif}
`.trim();

    conn.sendMessage(m.chat, {
      video: { url: gif.mp4 },
      caption,
      footer: '🚀 GIF obtenido vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: gif.title,
          thumbnailUrl: thumbnailCard,
          sourceUrl: gif.gif
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener GIFs.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['shtenor', 'tenor', 'tenorsearch'];
export default handler;
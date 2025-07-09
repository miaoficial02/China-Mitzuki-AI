// 🎞️ 𝗕𝘂𝘀𝗰𝗮𝗱𝗼𝗿 𝗱𝗲 𝗚𝗜𝗙𝘀 𝗱𝗲 𝗧𝗲𝗻𝗼𝗿 𝗽𝗼𝗿 𝗗𝗼𝗿𝗿𝗮𝘁𝘇

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: '🎬 *Escribe una palabra clave para buscar GIFs.*\nEjemplo:\n' + usedPrefix + command + ' rias gremory',
      footer: '🔎 Tenor Finder por Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de GIFs',
          body: 'Explora animaciones desde Tenor',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://tenor.com'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://api.dorratz.com/v3/tenor?q=${encodeURIComponent(text)}&limit=20`;
    let response = await fetch(api);
    let data = await response.json();
    let gifs = data.resultados;

    if (!Array.isArray(gifs) || gifs.length === 0) {
      return m.reply(`❌ No se encontraron GIFs para: ${text}`);
    }

    let gif = gifs[0];
    let caption = `
🎀 *Descripción:* ${gif.alt}
🔗 *Tenor:* ${gif.Enlace || gif.enlace}
`.trim();

    conn.sendMessage(m.chat, {
      video: { url: gif.gif },
      caption,
      footer: '🚀 GIF obtenido vía Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'GIF de Tenor',
          thumbnailUrl: thumbnailCard,
          sourceUrl: gif.Enlace || gif.enlace
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener GIFs.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['tenorsearch', 'tenor', 'riasgif'];
export default handler;
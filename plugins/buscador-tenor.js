// 🎞️ Buscador de GIFs Tenor con miniatura de tarjeta fija

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // miniatura fija en tarjeta
  
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎬 *Escribe una palabra clave para buscar GIFs.*\nEjemplo:\n${usedPrefix + command} rias gremory`,
      footer: '🌀 Tenor Finder por Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: 'Tenor GIF Finder',
          body: 'Busca animaciones con estilo',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://tenor.com'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://api.dorratz.com/v3/tenor?q=${encodeURIComponent(text)}&limit=20`;
    let res = await fetch(api);
    let json = await res.json();

    let results = json.resultados;
    if (!Array.isArray(results) || results.length === 0) {
      return m.reply(`❌ No se encontraron GIFs para: ${text}`);
    }

    let gif = results[0];
    let gifLink = gif.Enlace || gif.enlace || 'https://tenor.com';
    let altText = gif.alt || 'GIF de Tenor';

    conn.sendMessage(m.chat, {
      video: { url: gif.gif },
      caption: `🎀 *Descripción:* ${altText}\n🔗 *Tenor:* ${gifLink}`,
      footer: '🚀 GIF obtenido vía Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: altText,
          thumbnailUrl: thumbnailCard,
          sourceUrl: gifLink
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener GIFs.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['tenorsearch', 'gifsearch', 'riasgif'];
export default handler;
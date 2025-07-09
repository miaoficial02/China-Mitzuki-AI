// 🎮 Buscador de juegos Steam por Delirius API

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🕹️ *Escribe el nombre de un juego para buscar en Steam.*\nEjemplo:\n${usedPrefix + command} Left 4 Dead`,
      footer: '🎯 Steam Finder por Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de Juegos',
          body: 'Explora títulos desde Steam',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://store.steampowered.com'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://delirius-apiofc.vercel.app/search/steam?query=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    let games = json.datos;
    if (!Array.isArray(games) || games.length === 0) {
      return m.reply(`❌ No se encontraron juegos para: ${text}`);
    }

    let game = games[0];
    let caption = `
🎮 *Título:* ${game.título}
📅 *Lanzamiento:* ${game.release_date}
💰 *Precio:* ${game.precio}
⭐ *Valoración:* ${game.rating}
🔗 *Steam:* ${game.url}
`.trim();

    conn.sendMessage(m.chat, {
      image: { url: game.imagen },
      caption,
      footer: '🚀 Juego obtenido vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: game.título,
          body: `${game.precio} • ${game.rating}`,
          thumbnailUrl: thumbnailCard,
          sourceUrl: game.url
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener juegos.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['steamsearch', 'gamefinder', 'steam'];
export default handler;
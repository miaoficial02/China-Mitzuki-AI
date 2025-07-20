import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

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

    let games = json.data;
    if (!Array.isArray(games) || games.length === 0) {
      return m.reply(`❌ No se encontraron juegos para: ${text}`);
    }

    let selectedGames = games.slice(0, 3); // puedes ajustar cuántos mostrar
    for (let game of selectedGames) {
      let caption = `
🎮 *Título:* ${game.title}
📅 *Lanzamiento:* ${game.release_date || 'Sin fecha'}
💰 *Precio:* ${game.price}
⭐ *Valoración:* ${game.rating}
🔗 *Steam:* ${game.url}
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: game.image },
        caption,
        footer: '🚀 Juego obtenido vía Delirius API',
        contextInfo: {
          externalAdReply: {
            title: game.title,
            body: `${game.price} • ${game.rating}`,
            thumbnailUrl: thumbnailCard,
            sourceUrl: game.url
          }
        }
      }, { quoted: m });
    }

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener juegos.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['steamsearch', 'steam', 'juegosteam'];
export default handler;
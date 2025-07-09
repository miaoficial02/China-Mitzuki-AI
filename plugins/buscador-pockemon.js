// 🃏 Buscador de cartas Pokémon por Delirius API

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🧃 *Escribe el nombre de una carta Pokémon para buscar.*\nEjemplo:\n${usedPrefix + command} Caterpie`,
      footer: '🃏 Pokecard Finder por Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de Cartas Pokémon',
          body: 'Explora cartas desde Pokecard',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://pokemoncard.io'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://delirius-apiofc.vercel.app/search/pokecard?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let imageUrl = await res.text(); // La API devuelve directamente la URL de la imagen

    if (!imageUrl || !imageUrl.startsWith('http')) {
      return m.reply(`❌ No se encontró ninguna carta para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `🃏 *Carta Pokémon:* ${text}`,
      footer: '🚀 Carta obtenida vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Carta Pokémon',
          thumbnailUrl: thumbnailCard,
          sourceUrl: imageUrl
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener la carta.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['pokecardsearch', 'pokemoncard', 'cartapokemon'];
export default handler;
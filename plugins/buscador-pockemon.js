// 🃏 Buscador de Cartas Pokémon con múltiples fuentes (Delirius + TCG API)

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🧃 *Escribe el nombre de una carta Pokémon para buscar.*\nEjemplo:\n${usedPrefix + command} Caterpie`,
      footer: '🃏 Pokecard Finder - Delirius + TCG API',
      contextInfo: {
        externalAdReply: {
          title: 'Buscador de Cartas Pokémon',
          body: 'Explora colecciones visuales de múltiples fuentes',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://pokemoncard.io'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    let deliriusURL = `https://delirius-apiofc.vercel.app/search/pokecard?text=${encodeURIComponent(text)}`;
    let responseDelirius = await fetch(deliriusURL);
    let imageUrl = await responseDelirius.text();

    if (imageUrl && imageUrl.startsWith('http')) {
      return conn.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: `🃏 *Carta encontrada desde Delirius API*\n🔎 *Nombre:* ${text}`,
        footer: '🚀 Fuente: Delirius API',
        contextInfo: {
          externalAdReply: {
            title: text,
            body: 'Carta Pokémon',
            thumbnailUrl: thumbnailCard,
            sourceUrl: imageUrl
          }
        }
      }, { quoted: m });
    }

    // Fallback a Pokémon TCG API oficial
    let tcgUrl = `https://api.pokemontcg.io/v2/cards?q=name:${encodeURIComponent(text)}`;
    let responseTCG = await fetch(tcgUrl);
    let jsonTCG = await responseTCG.json();

    if (!jsonTCG?.data?.length) {
      return m.reply(`❌ No se encontró ninguna carta para: ${text}`);
    }

    let card = jsonTCG.data[0];
    let tcgImage = card?.images?.large || card?.images?.small || '';
    let tcgSite = `https://pokemontcg.io/cards/${card.id}`;

    conn.sendMessage(m.chat, {
      image: { url: tcgImage },
      caption: `🃏 *Carta encontrada desde TCG API*\n🔎 *Nombre:* ${card.name}\n📄 *Rareza:* ${card.rarity || 'Desconocida'}\n🎮 *Serie:* ${card.set?.name || 'Sin set'}\n🔗 *Link:* ${tcgSite}`,
      footer: '🚀 Fuente: Pokémon TCG API',
      contextInfo: {
        externalAdReply: {
          title: card.name,
          body: card.rarity || 'Carta Pokémon',
          thumbnailUrl: thumbnailCard,
          sourceUrl: tcgSite
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al obtener la carta.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['pokemon', 'cartapokemon', 'pokecard'];
export default handler;
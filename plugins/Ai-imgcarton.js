// 🎨 Generador de estilo caricatura 

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🎨 *Escribe el texto que quieres convertir en estilo caricatura.*\nEjemplo:\n${usedPrefix + command} Vreden`,
      footer: '🖌️ Cartoon Style Maker por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Generador de estilo caricatura',
          body: 'Convierte texto en arte cartoon',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    let api = `https://api.vreden.my.id/api/maker/ephoto/cartoonstyle?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json?.result || !json.result.startsWith('http')) {
      return m.reply(`❌ No se pudo generar la imagen para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `🎨 *Estilo caricatura generado:*\n🔤 *Texto:* ${text}`,
      footer: '🚀 Imagen creada vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Estilo cartoon aplicado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: json.result
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al generar la imagen.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['imgcarton', 'textocaricatura', 'caricaturatexto'];
export default handler;
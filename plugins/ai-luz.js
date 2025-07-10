// ✨ Generador de efectos de luz

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `✨ Escribe el texto que quieres convertir en efecto luminoso.\nEjemplo:\n${usedPrefix + command} Vreden`,
      footer: '🎨 Light Effects por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Generador de Efectos de Luz',
          body: 'Convierte tu texto en arte resplandeciente',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://api.vreden.my.id/api/maker/ephoto/lighteffects?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json?.result || !json.result.startsWith('http')) {
      return m.reply(`❌ No se pudo generar el efecto para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `✨ Efecto de luz generado:\n🔤 Texto: ${text}`,
      footer: '🚀 Imagen creada vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Texto luminoso personalizado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: json.result
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al generar el efecto de luz.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['luz', 'efectoluz', 'textoluz'];
export default handler;
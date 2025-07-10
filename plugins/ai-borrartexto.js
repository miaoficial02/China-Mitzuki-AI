// ❌ Generador de texto eliminado

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `❌ Escribe el texto que quieres transformar en efecto eliminado.\nEjemplo:\n${usedPrefix + command} Vreden`,
      footer: '🎨 Deleted Text por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Efecto de Texto Eliminado',
          body: 'Convierte tu texto en arte distorsionado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://api.vreden.my.id/api/maker/ephoto/deletingtext?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json?.result || !json.result.startsWith('http')) {
      return m.reply(`❌ No se pudo generar el efecto de eliminación para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `❌ Texto eliminado generado:\n🔤 Texto: ${text}`,
      footer: '🚀 Imagen creada vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Texto visualmente distorsionado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: json.result
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al generar el efecto de texto eliminado.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['eliminado', 'borrado', 'texborrar'];
export default handler;
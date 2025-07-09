// 🖋️ Generador de logos 

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura fija en la tarjeta

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `🖋️ *Escribe el texto que quieres convertir en un logo.*\nEjemplo:\n${usedPrefix + command} Vreden`,
      footer: '🎨 Logo Maker por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Generador de Logos',
          body: 'Convierte texto en arte visual',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.vreden.my.id'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    let api = `https://api.vreden.my.id/api/maker/ephoto/logomaker?text=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    if (!json?.result || !json.result.startsWith('http')) {
      return m.reply(`❌ No se pudo generar el logo para: ${text}`);
    }

    conn.sendMessage(m.chat, {
      image: { url: json.result },
      caption: `🖋️ *Logo generado:*\n🔤 *Texto:* ${text}`,
      footer: '🚀 Imagen creada vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: text,
          body: 'Logo personalizado',
          thumbnailUrl: thumbnailCard,
          sourceUrl: json.result
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al generar el logo.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['logo', 'crealogo', 'textologo'];
export default handler;
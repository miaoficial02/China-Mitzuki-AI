// 🖼️ VisionReply por Gemini API usando módulo de subida

import fetch from 'node-fetch';
import { uploadImage } from '../lib/uploadImage.js'; // Ajusta la ruta si usas ESModules

let handler = async (m, { conn, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  let imageMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
  if (!imageMessage) {
    return conn.sendMessage(m.chat, {
      text: `📷 *Responde a un mensaje con una imagen para analizarla.*\nEjemplo:\n"${usedPrefix + command}" como respuesta a una imagen.`,
      footer: '🔍 Gemini VisionReply',
      contextInfo: {
        externalAdReply: {
          title: 'Análisis inteligente con Gemini',
          body: 'Obtén una descripción detallada al instante',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });
  }

  try {
    let buffer = await conn.downloadMediaMessage(imageMessage);
    let imageUrl = await uploadImage(buffer); // Aquí subimos la imagen y obtenemos la URL

    const apiKey = 'TU_API_KEY'; // Sustituye por tu clave de Gemini
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;

    let res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: 'Describe esta imagen con el máximo detalle posible.' },
              {
                image: {
                  url: imageUrl
                }
              }
            ]
          }
        ]
      })
    });

    let json = await res.json();
    let description = json?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No se pudo generar descripción.';

    conn.sendMessage(m.chat, {
      text: `🖼️ *Descripción generada por IA:*\n${description}`,
      footer: '🔬 Gemini VisionReply API',
      contextInfo: {
        externalAdReply: {
          title: 'Resultado del análisis',
          body: 'Contenido interpretado con IA',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al analizar imagen.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['vision', 'geminianalyze'];
export default handler;

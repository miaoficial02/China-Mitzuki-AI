// 🧠 VisionReply con Gemini usando base64 directo

import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

  let imageMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
  if (!imageMessage) {
    return conn.sendMessage(m.chat, {
      text: `📷 *Responde con "${usedPrefix + command}" a una imagen para que la analice.*`,
      footer: '🧠 Gemini VisionReply',
      contextInfo: {
        externalAdReply: {
          title: 'Análisis de Imagen con IA',
          body: 'Obtén una descripción precisa en segundos',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });
  }

  try {
    let buffer = await conn.downloadMediaMessage(imageMessage);
    let base64Image = buffer.toString('base64');

    const apiKey = 'TU_API_KEY_AQUI';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`;

    let res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg', // cambia si tu imagen es .png, etc.
                  data: base64Image
                }
              },
              {
                text: 'Describe esta imagen de forma clara, precisa y creativa.'
              }
            ]
          }
        ]
      })
    });

    let json = await res.json();
    let description = json?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ No se pudo generar la descripción.';

    conn.sendMessage(m.chat, {
      text: `🖼️ *Descripción generada por Gemini:*\n${description}`,
      footer: '🔬 Gemini VisionReply API',
      contextInfo: {
        externalAdReply: {
          title: 'Resultado del análisis',
          body: 'Contenido interpretado por inteligencia artificial',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar la imagen.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['visiongemini', 'geminianalyze'];
export default handler;

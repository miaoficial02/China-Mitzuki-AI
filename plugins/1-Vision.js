// 🧠 VisionReply con Gemini API (Google AI)

// Asegúrate de tener tu API Key y endpoint configurados
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura personalizada

  let imageMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
  if (!imageMessage) {
    return conn.sendMessage(m.chat, {
      text: `📷 *Responde a un mensaje que contenga una imagen para que pueda analizarla.*\nEjemplo:\nResponde con "${usedPrefix + command}" a una foto.`,
      footer: '🔍 Gemini VisionReply por Delirius',
      contextInfo: {
        externalAdReply: {
          title: 'Análisis Inteligente de Imágenes',
          body: 'Descubre el contenido de cualquier imagen al instante',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });
  }

  try {
    // Descarga la imagen localmente
    let imagePath = await conn.downloadAndSaveMediaMessage(imageMessage);

    // Convierte la imagen a base64
    const fs = require('fs');
    let base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });

    // Solicitud a Gemini API
    const apiKey = 'AIzaSyBrYQZ3s5IVrp-on-ewJON8Gj6ZoD_NWWI'; // Reemplaza con tu clave real
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=' + apiKey;

    let res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image
                }
              },
              {
                text: 'Describe detalladamente esta imagen.'
              }
            ]
          }
        ]
      })
    });

    let json = await res.json();
    let description = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo analizar la imagen.';

    conn.sendMessage(m.chat, {
      text: `🖼️ *Descripción generada por IA:*\n${description}`,
      footer: '🔬 Gemini VisionReply API',
      contextInfo: {
        externalAdReply: {
          title: 'Imagen analizada con Gemini',
          body: 'Respuestas precisas y contextuales por IA',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Hubo un error analizando la imagen.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['visiongemini', 'geminianalyze'];
export default handler;

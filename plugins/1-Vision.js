// 🧠 VisionReply por Gemini + Delirius Style

import fetch from 'node-fetch';
import { uploadImage } from '../lib/uploadImage.js'; // Ajusta si tu estructura cambia

let handler = async (m, { conn, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';
  const apiKey = 'TU_API_KEY_AQUI'; // Reemplaza por tu clave de Gemini

  let quoted = m.quoted || m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.mime || !quoted.mime.startsWith('image/')) {
    return conn.sendMessage(m.chat, {
      text: `📸 *Responde a una imagen con el comando*:\n${usedPrefix + command}\nAsí podré analizarla.`,
      footer: '🧠 VisionReply por Gemini',
      contextInfo: {
        externalAdReply: {
          title: 'Análisis visual con IA',
          body: 'Interpreta imágenes con precisión artificial',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });
  }

  try {
    let buffer = await quoted.download();
    let imageUrl = await uploadImage(buffer); // Subida con tu módulo

    let res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: 'Describe detalladamente esta imagen en estilo observador y creativo.' },
              { image: { url: imageUrl } }
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
          title: 'Resultado de análisis visual',
          body: 'Contenido procesado con inteligencia artificial',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://ai.google.dev'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar imagen.\nDetalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['visiongemini', 'geminianalyze'];
export default handler;

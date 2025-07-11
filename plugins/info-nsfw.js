import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const thumbnailCard = 'https://i.imgur.com/vj2fakm.jpeg';
  let imageUrl = args[0];

  if (!imageUrl && !(m.quoted && m.quoted.mimetype && m.quoted.mimetype.includes('image'))) {
    await conn.sendMessage(m.chat, {
      text: `📸 *Envía una imagen o una URL para escanear contenido NSFW.*\nEjemplo:\n${usedPrefix + command} https://i.postimg.cc/3wkL5vtn/13.jpg`,
      footer: '🕵️ Detector NSFW sin API key',
      contextInfo: {
        externalAdReply: {
          title: 'Detector con Telegraph',
          body: 'Sin claves ni permisos especiales',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    // Si es imagen adjunta, se guarda localmente
    if (!imageUrl && m.quoted && m.quoted.mimetype.includes('image')) {
      const filePath = await conn.downloadAndSaveMediaMessage(m.quoted);
      const buffer = fs.readFileSync(filePath);

      const form = new FormData();
      form.append('file', buffer, 'imagen.jpg');

      const upload = await fetch('https://telegra.ph/upload', {
        method: 'POST',
        body: form
      });

      const resultUpload = await upload.json();
      if (!resultUpload[0]?.src) throw new Error('No se pudo subir la imagen.');

      imageUrl = 'https://telegra.ph' + resultUpload[0].src;
      fs.unlinkSync(filePath); // Limpia el archivo temporal
    }

    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/checknsfw?image=${encodeURIComponent(imageUrl)}`);
    const json = await res.json();
    const result = json?.data;

    if (!json?.status || typeof result?.NSFW !== 'boolean') {
      return m.reply(`❌ No se pudo analizar la imagen.`);
    }

    const icon = result.NSFW ? '⚠️' : '✅';
    const estado = result.NSFW ? 'NSFW detectado' : 'Imagen segura';

    const caption = `
${icon} *Resultado:* ${estado}
📊 *Probabilidad:* ${result.percentage}
🔒 *Seguro:* ${result.safe ? 'Sí' : 'No'}
📝 ${result.response}`;

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption,
      footer: '📷 Analizado vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: estado,
          body: `Probabilidad NSFW: ${result.percentage}`,
          thumbnailUrl: imageUrl,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error en NSFW plugin:', error);
    m.reply(`❌ Ocurrió un error durante el análisis.\n📛 ${error.message}`);
  }
};

handler.command = ['checknsfw', 'nsfwdetect', 'verificarimagen'];
export default handler;
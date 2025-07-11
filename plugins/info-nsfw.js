import fetch from 'node-fetch';
import FormData from 'form-data';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const thumbnailCard = 'https://i.imgur.com/vj2fakm.jpeg';
  let imageUrl = args[0];

  // Validación básica
  if (!imageUrl && !m.quoted?.mimetype?.startsWith('image')) {
    await conn.sendMessage(m.chat, {
      text: `📸 *Envía una imagen o URL para escanear contenido NSFW.*\nEjemplo:\n${usedPrefix + command} https://i.postimg.cc/3wkL5vtn/13.jpg`,
      footer: '🕵️‍♂️ Detector vía Delirius API + Telegraph',
      contextInfo: {
        externalAdReply: {
          title: 'Escaneo inteligente sin API key',
          body: 'Detecta contenido sensible en imágenes',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    // Si la imagen fue enviada directamente
    if (!imageUrl && m.quoted) {
      const buffer = await conn.downloadMediaMessage(m.quoted);
      const form = new FormData();
      form.append('file', buffer, 'imagen.jpg');

      const upload = await fetch('https://telegra.ph/upload', {
        method: 'POST',
        body: form
      });

      const resUpload = await upload.json();
      if (!resUpload[0]?.src) throw new Error('No se pudo subir la imagen.');

      imageUrl = 'https://telegra.ph' + resUpload[0].src;
    }

    // Escanear con Delirius API
    const scan = await fetch(`https://delirius-apiofc.vercel.app/tools/checknsfw?image=${encodeURIComponent(imageUrl)}`);
    const json = await scan.json();
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
      footer: '📷 Escaneo vía Delirius API',
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
    console.error('💥 Error en plugin NSFW sin API key:', error);
    m.reply(`❌ Hubo un problema con el análisis.\n📛 ${error.message}`);
  }
};

handler.command = ['checknsfw', 'nsfwdetect', 'verificarimagen'];
export default handler;
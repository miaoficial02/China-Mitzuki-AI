import fetch from 'node-fetch';
import FormData from 'form-data';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const thumbnailCard = 'https://i.imgur.com/vj2fakm.jpeg';
  let imageUrl = args[0];

  // Verifica si se recibió imagen o URL
  if (!imageUrl && !m.quoted?.mimetype?.includes('image')) {
    await conn.sendMessage(m.chat, {
      text: `📸 *Envía una imagen o una URL para escanear contenido NSFW.*\nEjemplo:\n${usedPrefix + command} https://i.postimg.cc/3wkL5vtn/13.jpg`,
      footer: '🕵️ Detector NSFW sin API key',
      contextInfo: {
        externalAdReply: {
          title: 'Detector sin dependencias',
          body: 'Funciona con Telegraph y Delirius',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    // Si la imagen fue reenviada o respondida
    if (!imageUrl && m.quoted?.mimetype.includes('image')) {
      const buffer = await conn.getFile(m.quoted).then(res => res.data); // Usa getFile en lugar de downloadMediaMessage
      const form = new FormData();
      form.append('file', buffer, 'image.jpg');

      const teleRes = await fetch('https://telegra.ph/upload', { method: 'POST', body: form });
      const teleJson = await teleRes.json();
      if (!teleJson[0]?.src) throw new Error('No se pudo subir la imagen.');

      imageUrl = 'https://telegra.ph' + teleJson[0].src;
    }

    // Escaneo con Delirius
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
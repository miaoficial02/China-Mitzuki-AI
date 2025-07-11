import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://i.imgur.com/vj2fakm.jpeg'; // Imagen decorativa
  const apiEndpoint = 'https://delirius-apiofc.vercel.app/tools/checknsfw?image=';

  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `📸 *Envía la URL de una imagen para escanear contenido NSFW.*\nEjemplo:\n${usedPrefix + command} https://i.postimg.cc/3wkL5vtn/13.jpg`,
      footer: '🕵️‍♂️ Escaneo vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Detector de contenido NSFW',
          body: 'Comprueba imágenes antes de compartirlas',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    const res = await fetch(`${apiEndpoint}${encodeURIComponent(text)}`);
    const json = await res.json();
    const result = json?.data;

    if (!json?.status || typeof result?.NSFW !== 'boolean') {
      return m.reply(`❌ No se pudo analizar la imagen.`);
    }

    const statusIcon = result.NSFW ? '⚠️' : '✅';
    const statusText = result.NSFW ? 'NSFW detectado' : 'Apta para todo público';

    const caption = `
${statusIcon} *Resultado: ${statusText}*
📊 Probabilidad: ${result.percentage}
🔒 Seguro: ${result.safe ? 'Sí' : 'No'}
📝 ${result.response}`;

    await conn.sendMessage(m.chat, {
      image: { url: text },
      caption,
      footer: '📷 Análisis vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: statusText,
          body: `Probabilidad NSFW: ${result.percentage}`,
          thumbnailUrl: text,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error en NSFW checker plugin:', error);
    m.reply(`❌ Ocurrió un error al analizar la imagen.\n📛 ${error.message}`);
  }
};

handler.command = ['checknsfw', 'nsfwdetect', 'verificarimagen'];
export default handler;
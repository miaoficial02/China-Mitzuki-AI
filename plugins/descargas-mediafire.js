// 📦 Descargador de MediaFire 

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'; // Miniatura para tarjeta visual
  const mainImage = 'https://qu.ax/AEkvz.jpg';     // Imagen principal del mensaje

  if (!text || !text.includes('mediafire.com')) {
    return conn.sendMessage(m.chat, {
      text: `📥 *Proporciona un enlace válido de MediaFire para descargar.*\nEjemplo:\n${usedPrefix + command} https://www.mediafire.com/file/abc123/example.zip/file`,
      footer: '🔗 MediaFire Downloader por Vreden API',
      contextInfo: {
        externalAdReply: {
          title: 'Descarga directa desde MediaFire',
          body: 'Convierte enlaces en descargas instantáneas',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://mediafire.com'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    const api = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(text)}`;
    const res = await fetch(api);
    const json = await res.json();

    const file = json.result?.[0];
    if (!file?.status || !file.link) {
      return m.reply('❌ No se pudo obtener el archivo desde MediaFire.');
    }

    const fileName = decodeURIComponent(file.nama);
    const caption = `
📄 *Nombre:* ${fileName}
📁 *Tipo:* ${file.mime}
📏 *Tamaño:* ${file.size}
🖥️ *Servidor:* ${file.server}
`.trim();

    // Mensaje 1: descripción con imagen personalizada
    await conn.sendMessage(m.chat, {
      image: { url: mainImage },
      caption,
      footer: '📦 Información del archivo vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: fileName,
          body: `${file.size} • ${file.mime}`,
          thumbnailUrl: thumbnailCard,
          sourceUrl: file.link
        }
      }
    }, { quoted: m });

    // Mensaje 2: archivo como documento
    await conn.sendMessage(m.chat, {
      document: {
        url: file.link,
        fileName,
        mimetype: 'application/zip'
      },
      caption: '📥 Archivo descargado desde MediaFire'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar el enlace.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['mediafire', 'mf', 'descargarmf'];
export default handler;
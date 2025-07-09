// 📦 Descargador de MediaFire (descripción + archivo por separado)

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg';

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
    let api = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(text)}`;
    let res = await fetch(api);
    let json = await res.json();

    let file = json.result?.[0];
    if (!file?.status || !file.link) {
      return m.reply(`❌ No se pudo obtener el archivo desde MediaFire.`);
    }

    let caption = `
📄 *Nombre:* ${decodeURIComponent(file.nama)}
📁 *Tipo:* ${file.mime}
📏 *Tamaño:* ${file.size}
🖥️ *Servidor:* ${file.server}
🔗 *Enlace directo:* ${file.link}
`.trim();

    // Mensaje 1: descripción del archivo
    await conn.sendMessage(m.chat, {
      image: { url: thumbnailCard },
      caption,
      footer: '📦 Información del archivo vía Vreden API',
      contextInfo: {
        externalAdReply: {
          title: decodeURIComponent(file.nama),
          body: `${file.size} • ${file.mime}`,
          thumbnailUrl: thumbnailCard,
          sourceUrl: file.link
        }
      }
    }, { quoted: m });

    // Mensaje 2: archivo como documento
    await conn.sendMessage(m.chat, {
      document: { url: file.link, fileName: decodeURIComponent(file.nama), mimetype: 'application/zip' },
      mimetype: 'application/zip',
      fileName: decodeURIComponent(file.nama),
      caption: '📥 Archivo descargado desde MediaFire'
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ Error al procesar el enlace.\n📛 Detalles: ${error.message}`);
    m.react('⚠️');
  }
};

handler.command = ['mediafiredl', 'mf', 'mediafire'];
export default handler;
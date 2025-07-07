import fetch from 'node-fetch';

const SEARCH_APIS = [
  { name: 'Servidor Masha', url: 'http://api.alyabot.xyz:3269/search_youtube?query=' },
  { name: 'Servidor Alya', url: 'http://api2.alyabot.xyz:5216/search_youtube?query=' },
  { name: 'Servidor Masachika', url: 'https://api3.alyabot.xyz/search_youtube?query=' }
];

const DOWNLOAD_APIS = {
  'Servidor Masha': 'http://api.alyabot.xyz:3269/download_video?url=',
  'Servidor Alya': 'http://api2.alyabot.xyz:5216/download_video?url=',
  'Servidor Masachika': 'https://api3.alyabot.xyz/download_video?url='
};

async function tryFetchJSON(servers, query) {
  console.log('DEBUG: Iniciando tryFetchJSON para la búsqueda.');
  for (const server of servers) {
    try {
      console.log(`DEBUG: Intentando buscar en URL: ${server.url + encodeURIComponent(query)}`);
      const res = await fetch(server.url + encodeURIComponent(query));
      if (!res.ok) {
        console.warn(`DEBUG: Un servidor de búsqueda falló con estado: ${res.status}`);
        continue;
      }
      const json = await res.json();
      if (json && Object.keys(json).length) {
        console.log(`DEBUG: Búsqueda exitosa desde ${server.name}`);
        return { json, serverName: server.name };
      }
    } catch (error) {
      console.error(`DEBUG: Error al buscar en un servidor:`, error);
      continue;
    }
  }
  console.log('DEBUG: No se encontraron resultados de búsqueda válidos.');
  return { json: null, serverName: null };
}

const handler = async (m, { text, conn }) => {
  console.log('DEBUG: Handler iniciado.');
  if (!text) {
    console.log('DEBUG: No se proporcionó texto, enviando mensaje de ayuda.');
    return conn.reply(m.chat, `🔎 *¿Qué video deseas descargar?*\nEscribe el nombre o link del video.`, m);
  }

  try {
    console.log('DEBUG: Enviando mensaje de búsqueda inicial.');
    await conn.sendMessage(m.chat, {
      text: `🔭 *Shizuka está buscando tu video...*`,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Explorando YouTube...",
          body: "⏳ Un momento...",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    console.log(`DEBUG: Buscando video con query: ${text}`);
    const { json: searchJson, serverName } = await tryFetchJSON(SEARCH_APIS, text);
    if (!searchJson || !searchJson.results?.length) {
      console.log('DEBUG: No se encontraron resultados para la búsqueda.');
      return conn.reply(m.chat, '⚠️ *No se encontraron resultados para tu búsqueda.*', m);
    }

    const video = searchJson.results[0];
    const thumb = video.thumbnails?.find(t => t.width >= 720)?.url || video.thumbnails?.[0]?.url;
    const title = video.title || 'Sin título';
    const url = video.url;
    const duration = video.duration ? `${Math.floor(video.duration)}s` : 'Desconocido';
    const views = video.views?.toLocaleString() || 'Desconocido';
    const canal = video.channel || 'Desconocido';

    const info = `
🎞️ *${title}*
👤 *Canal:* ${canal}
⏱️ *Duración:* ${duration}
👁️ *Vistas:* ${views}
🔗 *Link:* ${url}
`.trim();

    console.log('DEBUG: Enviando información del video.');
    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "🎁 Preparando el MP4 para ti...",
          thumbnailUrl: thumb,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    const downloadServersToTry = Object.keys(DOWNLOAD_APIS);
    let downloadUrl = null;

    console.log('DEBUG: Iniciando intento de descarga.');
    for (const serverKey of downloadServersToTry) {
      const currentDownloadUrlBase = DOWNLOAD_APIS[serverKey];
      try {
        console.log(`DEBUG: Intentando descargar de un servidor de descarga.`);
        const res = await fetch(currentDownloadUrlBase + encodeURIComponent(url));

        if (!res.ok) {
          console.error(`DEBUG: Un servidor de descarga falló con estado: ${res.status}`);
          continue;
        }

        const json = await res.json();
        console.log(`DEBUG: Respuesta JSON del servidor de descarga:`, json); // Añadido para ver el JSON completo
        downloadUrl = json.download_url || json.result?.url || json.url || json.data?.url;

        if (downloadUrl) {
          console.log(`DEBUG: URL de descarga obtenida con éxito: ${downloadUrl}`);
          break;
        } else {
          console.warn(`DEBUG: No se encontró una URL de descarga válida en la respuesta de un servidor.`);
        }
      } catch (e) {
        console.error(`DEBUG: Error al descargar de un servidor:`, e);
      }
    }

    if (!downloadUrl) {
      console.log('DEBUG: No se pudo obtener el enlace de descarga de ningún servidor.');
      return conn.reply(m.chat, '🚫 *No se pudo obtener el enlace de descarga del video desde ningún servidor disponible.*', m);
    }

    console.log('DEBUG: Intentando enviar el video.');
    await conn.sendMessage(m.chat, {
      video: { url: downloadUrl },
      fileName: `${title}.mp4`,
      mimetype: 'video/mp4'
    }, { quoted: m });
    console.log('DEBUG: Video enviado con éxito.');

  } catch (e) {
    console.error("DEBUG: ❌ Error en play2 (catch principal):", e);
    // Asegúrate de que este console.error siempre se muestre.
    // Si incluso esto no aparece, el problema es más fundamental (ej. el entorno de ejecución).
    return conn.reply(m.chat, `❌ *Ocurrió un error inesperado al procesar el video.*\n${e.message || e}`, m);
  }
};

handler.command = /^play2|mp4|ytmp4|ytv$/i;
handler.help = ['play2 <nombre del video>'];
handler.tags = ['descargas'];

export default handler;

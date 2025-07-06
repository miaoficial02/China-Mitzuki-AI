import fetch from 'node-fetch';

const SEARCH_APIS = [
  { name: 'Servidor Masha', url: 'http://api.alyabot.xyz:3269/search_youtube?query=' },
  { name: 'Servidor Alya', url: 'http://api2.alyabot.xyz:5216/search_youtube?query=' },
  { name: 'Servidor Masachika', url: 'https://api3.alyabot.xyz/search_youtube?query=' }
];

const DOWNLOAD_APIS = [
  { name: 'Servidor Masha', url: 'http://api.alyabot.xyz:3269/download_video?url=' },
  { name: 'Servidor Alya', url: 'http://api2.alyabot.xyz:5216/download_video?url=' },
  { name: 'Servidor Masachika', url: 'https://api3.alyabot.xyz/download_video?url=' }
];

async function tryFetchJSON(servers, query) {
  for (let server of servers) {
    try {
      const res = await fetch(server.url + encodeURIComponent(query));
      if (!res.ok) continue;
      const json = await res.json();
      if (json && Object.keys(json).length) return { json, serverName: server.name };
    } catch {
      continue;
    }
  }
  return { json: null, serverName: null };
}

const handler = async (m, { text, conn, command }) => {
  if (!text) return conn.reply(m.chat, `🔍 *¿Qué video deseas descargar?*\nEscribe el nombre o enlace del video.`, m);

  try {
    // Mensaje de búsqueda inicial
    await conn.sendMessage(m.chat, {
      text: `🔭 *Shizuka está buscando tu video...*`,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Explorando YouTube...",
          body: "⏳ Esto tomará un par de segundos",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "https://youtube.com",
          sourceUrl: "https://youtube.com",
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // Buscar video desde los servidores Alya
    const { json: searchJson, serverName: searchServer } = await tryFetchJSON(SEARCH_APIS, text);
    if (!searchJson || !searchJson.results || !searchJson.results.length) {
      return conn.reply(m.chat, '⚠️ *No se encontraron resultados para tu búsqueda.*', m);
    }

    const video = searchJson.results[0];
    const thumb = video.thumbnails?.find(t => t.width >= 720)?.url || video.thumbnails?.[0]?.url;
    const videoTitle = video.title || "Video";
    const videoUrl = video.url;
    const duration = video.duration ? `${Math.floor(video.duration)}s` : "Desconocido";
    const views = video.views?.toLocaleString() || "Desconocido";
    const channel = video.channel || "Desconocido";

    const ficha = `
🎥 *${videoTitle}*
👤 *Canal:* ${channel}
⏱️ *Duración:* ${duration}
👁️ *Vistas:* ${views}
🌐 *Servidor:* ${searchServer || 'Desconocido'}
🔗 *Enlace:* ${videoUrl}
`.trim();

    await conn.sendMessage(m.chat, {
      image: { url: thumb },
      caption: ficha,
      contextInfo: {
        externalAdReply: {
          title: "🎬 Shizuka Video",
          body: "💫 Preparando el MP4 para ti...",
          thumbnailUrl: thumb,
          mediaType: 1,
          previewType: 0,
          mediaUrl: videoUrl,
          sourceUrl: videoUrl,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m });

    // Descargar video desde los servidores Alya
    const { json: downloadJson } = await tryFetchJSON(DOWNLOAD_APIS, videoUrl);
    const directLink =
      downloadJson?.download_url ||
      downloadJson?.result?.url ||
      downloadJson?.url ||
      downloadJson?.data?.url;

    if (!downloadJson || !directLink) {
      return conn.reply(m.chat, '🚫 *No se pudo obtener el enlace de descarga del video.*', m);
    }

    await conn.sendMessage(m.chat, {
      video: { url: directLink },
      fileName: `${videoTitle}.mp4`,
      mimetype: 'video/mp4'
    }, { quoted: m });

  } catch (err) {
    console.error("❌ Error en play2:", err);
    return conn.reply(m.chat, `❌ *Hubo un error inesperado.*\n${err}`, m);
  }
};

handler.command = /^play2|mp4|ytmp4|ytv$/i;
handler.tags = ['descargas'];
handler.help = ['play2 <nombre o link del video>'];
export default handler;
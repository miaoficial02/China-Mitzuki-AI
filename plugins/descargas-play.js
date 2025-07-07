import fetch from 'node-fetch';

// Define las APIs de descarga de Spotify aquí, puedes añadir más si encuentras
const SPOTIFY_DOWNLOAD_APIS = [
  { name: 'Nekorinn', urlBuilder: (query) => `https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(query)}` },
  // Si encuentras otras APIs de descarga de Spotify que funcionen, añádelas aquí.
  // Ejemplo: { name: 'Otra API', urlBuilder: (query) => `https://otraapi.com/spotify?q=${encodeURIComponent(query)}` },
];

/**
 * Tries to download Spotify audio from a list of APIs until one succeeds.
 * @param {string} query - The search query for the Spotify track.
 * @returns {Promise<{metadata: Object|null, downloadUrl: string|null, apiName: string|null}>} - The track metadata, download URL, and name of the API that succeeded.
 */
async function tryDownloadSpotify(query) {
  for (const apiConfig of SPOTIFY_DOWNLOAD_APIS) {
    try {
      const fullUrl = apiConfig.urlBuilder(query);
      // console.log(`DEBUG: Intentando descargar Spotify desde ${apiConfig.name}: ${fullUrl}`); // For debugging

      const res = await fetch(fullUrl);
      if (!res.ok) {
        console.warn(`⚠️ API ${apiConfig.name} falló con estado: ${res.status}. Probando otra...`);
        continue;
      }

      const json = await res.json();
      // console.log(`DEBUG: Respuesta JSON de ${apiConfig.name}:`, json); // For debugging

      if (json.status && json.result?.downloadUrl && json.result?.metadata) {
        console.log(`✅ Descarga de Spotify exitosa desde API: ${apiConfig.name}`);
        return {
          metadata: json.result.metadata,
          downloadUrl: json.result.downloadUrl,
          apiName: apiConfig.name
        };
      } else {
        console.warn(`❌ API ${apiConfig.name} no devolvió datos válidos. Probando otra...`);
      }
    } catch (e) {
      console.error(`⚠️ Error al conectar con API ${apiConfig.name}: ${e.message || e}. Probando otra...`);
    }
  }
  console.error("⛔ Ninguna API de Spotify respondió correctamente o devolvió un enlace válido.");
  return { metadata: null, downloadUrl: null, apiName: null };
}


let handler = async (m, { conn, args, command, usedPrefix }) => {
  const text = args.join(" ");
  if (!text) {
    // Mensaje de uso con estilo Shizuka
    return conn.sendMessage(m.chat, {
      text: `🔍 *¿Qué canción de Spotify deseas buscar?*\nEscribe el nombre de la canción o artista.`,
      contextInfo: {
        externalAdReply: {
          title: "🎧 Spotify Downloader",
          body: `Uso: ${usedPrefix + command} shakira soltera`,
          mediaType: 1,
          previewType: 0,
          mediaUrl: "http://googleusercontent.com/spotify.com/0", // URL genérica para Spotify
          sourceUrl: "http://googleusercontent.com/spotify.com/0", // URL genérica para Spotify
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });
  }

  try {
    await m.react('⌛');

    // Mensaje de búsqueda inicial con estilo Shizuka
    await conn.sendMessage(m.chat, {
      text: `🔭 *Shizuka está buscando tu canción de Spotify...*`,
      contextInfo: {
        externalAdReply: {
          title: "🎵 Explorando Spotify...",
          body: "⏳ Un momento...",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "http://googleusercontent.com/spotify.com/0",
          sourceUrl: "http://googleusercontent.com/spotify.com/0",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // Intenta descargar el audio de Spotify usando múltiples APIs
    const { metadata, downloadUrl, apiName } = await tryDownloadSpotify(text);

    if (!metadata || !downloadUrl) {
      // Mensaje de no encontrado con estilo Shizuka
      return conn.sendMessage(m.chat, {
        text: `⚠️ *No se encontraron resultados para tu búsqueda en Spotify:* "${text}".`,
        contextInfo: {
          externalAdReply: {
            title: "❌ Búsqueda Fallida",
            body: "Intenta con un nombre diferente.",
            mediaType: 1,
            previewType: 0,
            mediaUrl: "http://googleusercontent.com/spotify.com/0",
            sourceUrl: "http://googleusercontent.com/spotify.com/0",
            thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });
    }

    const { title, artist, duration, cover, url } = metadata;

    // Mensaje de información de la canción con estilo Shizuka
    const infoMessage = `
🎵 *Título:* ${title}
👤 *Artista:* ${artist}
⏱️ *Duración:* ${duration}
🌐 *Spotify:* ${url}
`.trim();

    // Fetchear la imagen de la portada para el thumbnail
    const coverBuffer = (await conn.getFile(cover))?.data;

    await conn.sendMessage(m.chat, {
      text: infoMessage, // Usamos 'text' para el mensaje
      contextInfo: {
        externalAdReply: {
          title: "🎶 Canción de Spotify Encontrada",
          body: "🎁 Preparando tu MP3...",
          mediaType: 1,
          previewType: 0,
          mediaUrl: url, // URL de la canción de Spotify
          sourceUrl: url, // URL de la canción de Spotify
          thumbnail: coverBuffer, // Usamos el buffer de la portada
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    // Enviar el audio
    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg', // Aseguramos que sea mpeg para MP3
      ptt: false,
      fileName: `${title}.mp3`
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error("❌ Error en el handler de Spotify:", e);
    // Mensaje de error general con estilo Shizuka
    return conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error inesperado al procesar tu solicitud.*\nIntenta nuevamente más tarde.`,
      contextInfo: {
        externalAdReply: {
          title: "🚨 Error",
          body: "Algo salió mal.",
          mediaType: 1,
          previewType: 0,
          mediaUrl: "http://googleusercontent.com/spotify.com/0",
          sourceUrl: "http://googleusercontent.com/spotify.com/0",
          thumbnailUrl: "https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg",
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });
  }
};

handler.help = ['play <nombre>'];
handler.tags = ['descargas'];
handler.command = /^playspotify$/i; // Cambiado a playspotify para evitar conflicto con el play de YouTube
handler.register = true;

export default handler;

import fetch from 'node-fetch';

const estilo = {
  sinQuery: '🔍 *¿Qué deseas escuchar?* Escribe el título o artista para buscar en YouTube.',
  errorBusqueda: '❌ *No encontré resultados válidos.* Intenta con otro nombre o revisa la conexión.',
  errorDescarga: '💥 *No se pudo convertir el video a audio.* Tal vez esté restringido o no disponible.',
  selecciona: '🎶 *Resultado encontrado:*\nPresiona el botón para descargar el audio.',
  descargando: '📥 *Descargando MP3...* Un momento mientras preparo tu archivo 🎧',
};

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const texto = args.join(' ');
  if (!texto) return conn.sendMessage(m.chat, { text: estilo.sinQuery }, { quoted: m });

  const buscar = `https://api.sylphy.xyz/search/youtube?q=${encodeURIComponent(texto)}`;
  try {
    const respuesta = await fetch(buscar);
    const resultado = await respuesta.json();

    const video = Array.isArray(resultado.result) && resultado.result[0];
    if (!video || !video.url) return conn.sendMessage(m.chat, { text: estilo.errorBusqueda }, { quoted: m });

    const { title, duration, views, thumbnail, url } = video;

    // Enviar botón de descarga
    const botones = [
      {
        buttonId: `${usedPrefix}ytmp3shizuka ${url}`,
        buttonText: { displayText: '🎧 Descargar MP3' },
        type: 1,
      },
    ];

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `✨ *${title}*\n🕒 Duración: ${duration}\n👁️ Vistas: ${views}\n\n${estilo.selecciona}`,
      footer: 'Sistema musical de Shizuka',
      buttons: botones,
      headerType: 4,
    }, { quoted: m });
  } catch (error) {
    console.error('🛑 Error en la búsqueda:', error);
    conn.sendMessage(m.chat, { text: estilo.errorBusqueda }, { quoted: m });
  }
};

// Comando para descargar el MP3 después de usar el botón
const subHandler = async (m, { conn, args }) => {
  const url = args[0];
  if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
    return conn.sendMessage(m.chat, { text: '⚠️ *Enlace de YouTube no válido.*' }, { quoted: m });
  }

  const api = `https://api.sylphy.xyz/download/ytmp3?url=${encodeURIComponent(url)}`;

  try {
    await conn.sendMessage(m.chat, { text: estilo.descargando }, { quoted: m });

    const res = await fetch(api);
    const json = await res.json();
    const { title, link, size } = json.result;

    await conn.sendMessage(m.chat, {
      document: { url: link },
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg',
    }, { quoted: m });

  } catch (err) {
    console.error('🎧 Error al descargar MP3:', err);
    conn.sendMessage(m.chat, { text: estilo.errorDescarga }, { quoted: m });
  }
};

handler.command = /^play|shizuka$/i;
subHandler.command = /^ytmp3shizuka$/i;

export default [handler, subHandler];
import fetch from 'node-fetch';

const mensajes = {
  sinEnlace: (sitio) => `🧭 *¿Dónde está el enlace de ${sitio}?* Necesito eso para comenzar la misión.`,
  enlaceErróneo: (sitio) => `🚫 *Ups!* El enlace que diste de ${sitio} no cuadra. Échale otro vistazo.`,
  fallo: '💥 *Algo salió mal en el proceso.* Intenta en un ratito o usa otro link.',
  noDisponible: '🕵️‍♂️ *No encontré el archivo solicitado.* Asegúrate de que esté activo o no esté oculto tras magia oscura.',
  muyPesado: '📛 *Este archivo pesa más que mi capacidad mental.* No puedo procesar archivos de más de 650 MB.',
  ocupado: '🚦 *Estoy ocupado con otra descarga.* Espera un momento y vuelve a intentarlo.',
  completado: (nombre, tamaño) => `✅ *¡Archivo descargado con éxito!*\n🔸 *Nombre:* ${nombre}\n📦 *Tamaño:* ${tamaño}\nPuedes disfrutarlo ya mismo 🚀`,
};

let enProceso = false;

const notificar = (texto, conn, m) => {
  return conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

const validarURL = (url) => /^https?:\/\/(?:www\.)?mediafire\.com\/.+$/i.test(url);

const detectarMime = (nombre) => {
  const ext = nombre.toLowerCase().split('.').pop();
  const tipos = {
    apk: 'application/vnd.android.package-archive',
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    mp4: 'video/mp4',
    jpg: 'image/jpeg',
    png: 'image/png',
    pdf: 'application/pdf',
    mp3: 'audio/mpeg',
  };
  return tipos[ext] || 'application/octet-stream';
};

const apis = [
  (url) => `https://api.ryzumi.vip/api/downloader/mediafire?url=${encodeURIComponent(url)}`,
  (url) => `https://api.lolhuman.xyz/api/mediafire?apikey=b8d3bec7f13fa5231ba88431&url=${encodeURIComponent(url)}`,
  (url) => `https://api.sylphy.xyz/download/mediafire?url=${encodeURIComponent(url)}`,
];

const obtenerDatos (url) => {
  for (const construir of apis) {
    try {
      const res = await fetch(construir(url));
      const json = await res.json();

      if (json.status || json.result || json.link) {
        const info = json.result || json;
        const fileName = info.file_name || info.filename || 'archivo_mediafire';
        const downloadUrl = info.dl_link || info.link;
        const size = info.size || info.sizeh || '0 MB';
        const mb = parseFloat(size.replace(/[^\d.]/g, ''));

        if (downloadUrl && mb <= 650) {
          return { fileName, downloadUrl, size };
        }
      }
    } catch (error) {
      console.warn('⚠️ Error en una API, probando siguiente...', error.message);
    }
  }
  return null;
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return notificar(`📎 *Falta el enlace:* ${usedPrefix + command} https://www.mediafire.com/...`, conn, m);
  if (!validarURL(text)) return notificar(mensajes.enlaceErróneo('Mediafire'), conn, m);
  if (enProceso) return notificar(mensajes.ocupado, conn, m);

  try {
    enProceso = true;

    const datos = await obtenerDatosDescarga(text);
    if (!datos) return notificar(mensajes.noDisponible, conn, m);

    const mime = detectarMime(datos.fileName);

    await conn.sendMessage(m.chat, {
      document: { url: datos.downloadUrl },
      fileName: datos.fileName,
      mimetype: mime,
    }, { quoted: m });

    return notificar(mensajes.completado(datos.fileName, datos.size), conn, m);

  } catch (error) {
    console.error('🔥 Error general en el handler:', error);
    return notificar(mensajes.fallo, conn, m);
  } finally {
    enProceso = false;
  }
};

handler.command = /^mediafire$/i;
export default handler;
import fetch from 'node-fetch';

// Mensajes estilizados y dinámicos
const mssg = {
    noLink: (platform) => `🚫 *¿Olvidaste algo?* Necesito un enlace de ${platform} para continuar.`,
    invalidLink: (platform) => `🧩 *Hmm...* Ese enlace de ${platform} no parece correcto. Verifícalo, por favor.`,
    error: '💥 *¡Ups!* Hubo un problema al intentar procesar la descarga. Intenta de nuevo más tarde.',
    fileNotFound: '🔍 *No encontré el archivo.* Asegúrate de que el enlace sea correcto y esté disponible.',
    fileTooLarge: '📦 *El archivo supera los 650 MB.* No puedo descargarlo debido a su tamaño.',
    busy: '⏳ *Estoy ocupado procesando otra solicitud.* Un poco de paciencia, por favor.',
    success: (fileName, size) => `✅ *Descarga completada:*\n📁 Archivo: *${fileName}*\n📦 Tamaño: *${size}*\n¡Listo para usar!`,
};

// Estado del servidor
let isProcessing = false;

// Función para enviar respuestas rápidas
const reply = (texto, conn, m) => {
    conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

// Validación de URL Mediafire
const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?mediafire\.com\/.*$/i;
    return regex.test(url);
};

// Extraer nombre del archivo desde la URL
const extractFileNameFromLink = (url) => {
    const match = url.match(/\/file\/[^/]+\/(.+?)\/file$/i);
    return match ? decodeURIComponent(match[1].replace(/%20/g, ' ')) : null;
};

// Obtener MIME según la extensión
const getMimeType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        apk: 'application/vnd.android.package-archive',
        zip: 'application/zip',
        rar: 'application/vnd.rar',
        mp4: 'video/mp4',
        jpg: 'image/jpeg',
        png: 'image/png',
        pdf: 'application/pdf',
        mp3: 'audio/mpeg',
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

// Handler del comando Mediafire
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (command === 'mediafire') {
        if (!text) {
            return reply(`⚠️ *Por favor, ingresa un enlace de Mediafire*\n\n📌 Ejemplo:\n${usedPrefix + command} https://www.mediafire.com/file/abcd1234/file_name`, conn, m);
        }

        if (isProcessing) return reply(mssg.busy, conn, m);
        if (!isValidUrl(text)) return reply(mssg.invalidLink('Mediafire'), conn, m);

        try {
            isProcessing = true;
            console.log(`🔗 Procesando enlace: ${text}`);

            let fileName = extractFileNameFromLink(text) || 'archivo_descargado';

            const apiUrl = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(text)}`;
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();

            if (data.status && data.result && data.result.dl_link) {
                const downloadUrl = data.result.dl_link;
                const fileSize = parseFloat(data.result.size.replace(/[^0-9.]/g, ''));
                const formattedSize = data.result.size;

                if (fileSize > 650) return reply(mssg.fileTooLarge, conn, m);

                const mimeType = getMimeType(fileName);

                await conn.sendMessage(m.chat, {
                    document: { url: downloadUrl },
                    mimetype: mimeType,
                    fileName: fileName,
                }, { quoted: m });

                return reply(mssg.success(fileName, formattedSize), conn, m);
            } else {
                return reply(mssg.fileNotFound, conn, m);
            }

        } catch (error) {
            console.error('🚨 Error con la API de Mediafire:', error.message);
            return reply(mssg.error, conn, m);
        } finally {
            isProcessing = false;
        }
    }
};

handler.command = /^(mediafire|mfire)$/i;
export default handler;
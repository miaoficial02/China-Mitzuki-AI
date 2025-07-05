import fetch from 'node-fetch';

const mssg = {
    noLink: (platform) => `*🔗 ¡Ups! Parece que olvidaste poner un enlace de ${platform}. Por favor, compártelo para continuar.*`,
    invalidLink: (platform) => `*🚫 Hmm... el enlace no parece ser válido de ${platform}. Revisa que esté correcto y vuelve a intentarlo.*`,
    error: '*💥 Algo salió mal al procesar la descarga. Intenta más tarde o consulta con el desarrollador.*',
    fileNotFound: '*📭 No se encontró el archivo en Mediafire. ¿Seguro que el enlace es válido y el archivo aún está disponible?*',
    fileTooLarge: '*📦 El archivo supera los \`650 MB\` permitidos. Intenta con uno más liviano, por favor.*',
    busy: '*🔄 Estoy ocupado procesando otra descarga. Dame un momento y lo intento de nuevo.*`,
};

let isProcessing = false;

const reply = (texto, conn, m) => {
    conn.sendMessage(m.chat, { text: texto + `\n\n─ ⌬ *Zenitsu Bot ✨*`, }, { quoted: m });
};

const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?mediafire\.com\/.*$/i;
    return regex.test(url);
};

const getMimeType = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const mimeTypes = {
        'apk': 'application/vnd.android.package-archive',
        'zip': 'application/zip',
        'rar': 'application/vnd.rar',
        'mp4': 'video/mp4',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'pdf': 'application/pdf',
        'mp3': 'audio/mpeg',
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

let handler = async (m, { conn, text, command }) => {
    if (command === 'mediafire') {
        if (!text) return reply(mssg.noLink('Mediafire'), conn, m);
        if (isProcessing) return reply(mssg.busy, conn, m);
        if (!isValidUrl(text)) return reply(mssg.invalidLink('Mediafire'), conn, m);

        try {
            isProcessing = true;
            await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

            const apiUrl = `https://api.vreden.my.id/api/mediafiredl?url=${encodeURIComponent(text)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (!data.status || !data.result || !data.result.dl_link) {
                return reply(mssg.fileNotFound, conn, m);
            }

            const { dl_link, filename, size } = data.result;
            const sizeMB = parseFloat(size.replace(/[^0-9.]/g, ''));

            if (sizeMB > 650) return reply(mssg.fileTooLarge, conn, m);

            await conn.sendMessage(m.chat, {
                text: `✨ *Archivo listo para descargar:*\n\n📌 *Nombre:* ${filename}\n📏 *Tamaño:* ${size}\n\n_Enviando tu archivo..._`,
            }, { quoted: m });

            const mimeType = getMimeType(filename || 'documento');

            await conn.sendMessage(m.chat, {
                document: { url: dl_link },
                mimetype: mimeType,
                fileName: filename,
            }, { quoted: m });

            await conn.sendMessage(m.chat, {
                text: '✅ *¡Archivo enviado con éxito!* Si necesitas otra descarga, no dudes en escribirme. 😎',
            }, { quoted: m });

            await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        } catch (err) {
            console.error('❌ Error con la API:', err);
            await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            return reply(`${mssg.error}\n\`\`\`${err.message}\`\`\``, conn, m);
        } finally {
            isProcessing = false;
        }
    }
};

handler.command = ["mediafire", "mf"];
handler.register = false;
handler.diamantes = 3;

export default handler;
const axios = require('axios');

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '🚩 Ingrese el enlace de un archivo de MediaFire.',

            quoted: message

        });

    }

    if (!args[0].match(/mediafire/gi)) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Proporcione una URL válida de MediaFire.',

            quoted: message

        });

    }

    try {

        const response = await axios.get(`https://r.jina.ai/${args[0]}`);

        const text = response.data;

        const result = {

            title: (text.match(/Title: (.+)/) || [])[1]?.trim() || '',

            link: (text.match(/URL Source: (.+)/) || [])[1]?.trim() || '',

            filename: '',

            url: '',

            size: '',

            repair: ''

        };

        if (result.link) {

            const fileMatch = result.link.match(/\/([^\/]+\.zip)/);

            if (fileMatch) result.filename = fileMatch[1];

        }

        const matches = [...text.matchAll(/\[(.*?)\]\((https:\/\/[^\s]+)\)/g)];

        for (const match of matches) {

            const desc = match[1].trim();

            const link = match[2].trim();

            if (desc.toLowerCase().includes('download') && desc.match(/\((\d+(\.\d+)?[KMGT]B)\)/)) {

                result.url = link;

                result.size = (desc.match(/\((\d+(\.\d+)?[MG]B)\)/) || [])[1] || '';

            }

            if (desc.toLowerCase().includes('repair')) {

                result.repair = link;

            }

        }

        if (!result.url) {

            return await conn.sendMessage(message.key.remoteJid, {

                text: '❌ No se pudo obtener el enlace de descarga.',

                quoted: message

            });

        }

        let mediaFireInfo = `乂  *M E D I A F I R E  -  D O W N L O A D*

    ✩ *💜 Nombre:* ${result.title || result.filename || 'Desconocido'}

    ✩ *🚩 Tamaño:* ${result.size || 'Desconocido'}

    ✩ *🔗 Fuente:* ${result.link || args[0]}`;

        await conn.sendMessage(message.key.remoteJid, {

            document: { url: result.url },

            mimetype: 'application/zip',

            fileName: result.filename || result.title || 'mediafire_download.zip',

            caption: mediaFireInfo,

            quoted: message

        });

        if (result.repair) {

            await conn.sendMessage(message.key.remoteJid, {

                text: `*Enlace de reparación (si hay error en la descarga):*\n${result.repair}`,

                quoted: message

            });

        }

    } catch (error) {

        console.error('Error:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: `❌ Ocurrió un error. Intenta más tarde.\n${error.message}`,

            quoted: message

        });

    }

}

module.exports = {

    command: 'mediafire',

    handler,

};
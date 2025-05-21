const axios = require('axios');

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '❀ Por favor, ingresa lo que deseas buscar en Pinterest.',

            quoted: message

        });

    }

    const query = args.join(' ');

    const apiUrl = `https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`;

    try {

        await conn.sendMessage(message.key.remoteJid, {

            text: '✧ *Buscando imágenes en Pinterest...*',

            quoted: message

        });

        const response = await axios.get(apiUrl);

        const data = response.data;

        if (!Array.isArray(data) || data.length < 1) {

            return await conn.sendMessage(message.key.remoteJid, {

                text: '✧ No se encontraron suficientes imágenes.',

                quoted: message

            });

        }

        const images = data.slice(0, 5).map(img => img.image_large_url);

        for (const image of images) {

            await conn.sendMessage(message.key.remoteJid, {

                image: { url: image },

                caption: `❀ *Resultados de búsqueda para:* ${query}`,

                quoted: message

            });

        }

        await conn.sendMessage(message.key.remoteJid, {

            text: '✅ Imágenes enviadas exitosamente.',

            quoted: message

        });

    } catch (error) {

        console.error('Error al obtener imágenes:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: '⚠︎ Hubo un error al obtener las imágenes de Pinterest.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'pin',

    handler,

};
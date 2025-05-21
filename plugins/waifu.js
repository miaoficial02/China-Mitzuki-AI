
const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://api.waifu.pics/sfw/waifu');
        if (response.data && response.data.url) {
            const waifuImage = response.data.url;
            const description = '*💝 Aquí tienes tu waifu*';

            await conn.sendMessage(message.key.remoteJid, {
                image: { url: waifuImage },
                caption: description,
                quoted: message
            });
        } else {
            await conn.sendMessage(message.key.remoteJid, {
                text: 'No se pudo obtener una imagen de waifu en este momento.',
            });
        }
    } catch (err) {
        console.error('Error al obtener la imagen de waifu:', err.message);
        await conn.sendMessage(message.key.remoteJid, {
            text: 'Hubo un error al procesar tu solicitud.',
        });
    }
}

module.exports = {
    command: 'waifu',
    handler,
};

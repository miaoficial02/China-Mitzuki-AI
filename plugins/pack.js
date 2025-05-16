const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://delirius-apiofc.vercel.app/nsfw/girls/');
        if (response.data && response.data.status) {
            const animeImage = response.data.image;
            const description = '*Estas caliente 🔥 *';

            await conn.sendMessage(message.key.remoteJid, {
                image: { url: animeImage },
                caption: description,
            });
        } else {
            await conn.sendMessage(message.key.remoteJid, {
                text: 'No se pudo obtener una imagen en este momento. Intenta de nuevo más tarde.',
            });
        }
    } catch (err) {
        console.error('Error al obtener la imagen de anime:', err.message);
        await conn.sendMessage(message.key.remoteJid, {
            text: 'Hubo un error al procesar tu solicitud. Intenta de nuevo más tarde.',
        });
    }
}

module.exports = {
    command: 'pack',
    handler,
};
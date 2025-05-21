
const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://api.waifu.pics/nsfw/waifu');
        
        if (response.data && response.data.url) {
            await conn.sendMessage(message.key.remoteJid, {
                image: { url: response.data.url },
                caption: '🔞 *NSFW* | Imagen +18',
                quoted: message
            });
        } else {
            await conn.sendMessage(message.key.remoteJid, {
                text: '❌ No se pudo obtener la imagen. Intenta de nuevo.',
                quoted: message
            });
        }
    } catch (err) {
        console.error('Error en NSFW:', err);
        await conn.sendMessage(message.key.remoteJid, {
            text: '❌ Ocurrió un error. Intenta más tarde.',
            quoted: message
        });
    }
}

module.exports = {
    command: 'nsfw',
    handler,
};

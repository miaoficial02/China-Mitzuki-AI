
const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://meme-api.com/gimme');
        await conn.sendMessage(message.key.remoteJid, {
            image: { url: response.data.url },
            caption: `😂 *${response.data.title}*`,
            quoted: message
        });
    } catch (error) {
        await conn.sendMessage(message.key.remoteJid, { 
            text: '❌ Error al obtener el meme',
            quoted: message 
        });
    }
}

module.exports = {
    command: 'meme',
    handler
};

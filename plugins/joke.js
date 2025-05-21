
const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?safe-mode');
        const joke = response.data.type === 'single' 
            ? response.data.joke
            : `${response.data.setup}\n\n${response.data.delivery}`;
            
        await conn.sendMessage(message.key.remoteJid, {
            text: `😄 *Chiste:*\n${joke}`,
            quoted: message
        });
    } catch (error) {
        await conn.sendMessage(message.key.remoteJid, {
            text: '❌ Error al obtener el chiste',
            quoted: message
        });
    }
}

module.exports = {
    command: 'joke',
    handler
};

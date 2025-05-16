
const axios = require('axios');

async function handler(conn, { message }) {
    try {
        const response = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');
        await conn.sendMessage(message.key.remoteJid, {
            text: `📚 *Dato curioso:*\n${response.data.text}`,
            quoted: message
        });
    } catch (error) {
        await conn.sendMessage(message.key.remoteJid, {
            text: '❌ Error al obtener el dato curioso',
            quoted: message
        });
    }
}

module.exports = {
    command: 'fact',
    handler
};

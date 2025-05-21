const axios = require('axios');

async function handler(conn, { message }) {

    try {

        const response = await axios.get('https://api.dorratz.com/nsfw/tetas', { responseType: 'arraybuffer' });

        if (response.data) {

            await conn.sendMessage(message.key.remoteJid, {

                image: Buffer.from(response.data),

                caption: 'Asi son las mias',

                quoted: message

            });

        } else {

            await conn.sendMessage(message.key.remoteJid, {

                text: 'No hay tetas ricas por ahora,vete a dormir 💤',

                quoted: message

            });

        }

    } catch (err) {

        console.error('Error:', err);

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Ocurrió un error al obtener la imagen.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'tetas',

    handler,

};
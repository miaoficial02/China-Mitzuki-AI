const axios = require('axios');

async function handler(conn, { message }) {

    try {

        const response = await axios.get('https://api.thecatapi.com/v1/images/search'); // API de imágenes de gatos

        if (response.data && response.data[0]?.url) {

            await conn.sendMessage(message.key.remoteJid, {

                image: { url: response.data[0].url },

                caption: 'Aquí tienes un lindo gatito 🐱',

                quoted: message

            });

        } else {

            await conn.sendMessage(message.key.remoteJid, {

                text: 'No encontré un gatito ahora, pero te prometo que vendrán más pronto! 🐾',

                quoted: message

            });

        }

    } catch (err) {

        console.error('Error:', err);

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Ocurrió un error. Intenta más tarde.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'gatito',

    handler,

};
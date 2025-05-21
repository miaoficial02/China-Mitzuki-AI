const axios = require('axios');

async function handler(conn, { message }) {

    try {

        const response = await axios.get('https://delirius-apiofc.vercel.app/nsfw/girls', { responseType: 'arraybuffer' });

        if (response.data) {

            await conn.sendMessage(message.key.remoteJid, {

                image: Buffer.from(response.data),

                caption: 'Estas caliente 🔥| Contenido +18',

                quoted: message

            });

        } else {

            await conn.sendMessage(message.key.remoteJid, {

                text: 'No se pudo obtener el pack. 😔',

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

    command: 'pack',

    handler,

};
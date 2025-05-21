const hispamemes = require('hispamemes');

async function handler(conn, { message }) {

    try {

        await conn.sendMessage(message.key.remoteJid, {

            text: '🎭 Buscando un meme divertido...',

            quoted: message

        });

        const meme = hispamemes.meme();

        await conn.sendMessage(message.key.remoteJid, {

            image: { url: meme },

            caption: '🎭 *Meme en Español*',

            quoted: message

        });

    } catch (error) {

        console.error('Error al obtener el meme:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ No se pudo obtener un meme. Intenta nuevamente más tarde.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'meme',

    handler,

};
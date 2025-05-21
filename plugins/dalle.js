const axios = require('axios');

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '✨ Por favor proporciona una descripción para generar la imagen.\n\nEjemplo: .dalle gato astronauta',

            quoted: message

        });

    }

    const prompt = args.join(' ');

    const apiUrl = `https://api.dorratz.com/v3/ai-image?prompt=${encodeURIComponent(prompt)}`;

    try {

        await conn.sendMessage(message.key.remoteJid, {

            text: '*🧧 Espere un momento...*',

            quoted: message

        });

        const response = await axios.get(apiUrl);

        if (response.data && response.data.data && response.data.data.image_link) {

            const imageUrl = response.data.data.image_link;

            await conn.sendMessage(message.key.remoteJid, {

                image: { url: imageUrl },

                caption: `🎨 *Imagen generada con DALLE*\n📝 *Prompt:* ${prompt}`,

                quoted: message

            });

        } else {

            throw new Error('No se encontró la imagen en la respuesta.');

        }

    } catch (error) {

        console.error('Error al generar la imagen:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Error al generar la imagen. Por favor, intenta de nuevo más tarde.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'dalle',

    handler,

};
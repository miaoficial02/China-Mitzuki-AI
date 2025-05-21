const axios = require("axios");

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '❀ Por favor, ingresa un término para generar una imagen.',

            quoted: message

        });

    }

    const query = args.join(' ');

    await conn.sendMessage(message.key.remoteJid, {

        text: '🕓 Generando imagen...',

        quoted: message

    });

    try {

        const result = await fluximg.create(query);

        if (result && result.imageLink) {

            await conn.sendMessage(message.key.remoteJid, {

                image: { url: result.imageLink },

                caption: `✨ *Resultados de:* ${query}`,

                quoted: message

            });

        } else {

            throw new Error("No se pudo crear la imagen. Intenta otra vez.");

        }

    } catch (error) {

        console.error('Error al generar la imagen:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Se produjo un error al generar la imagen.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'flux',

    handler,

};

const fluximg = {

    defaultRatio: "2:3",

    create: async (query) => {

        const config = {

            headers: {

                accept: "*/*",

                authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",

                "user-agent": "Postify/1.0.0",

            },

        };

        try {

            const response = await axios.get(

                `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(query)}&aspect_ratio=${fluximg.defaultRatio}`,

                config

            );

            return { imageLink: response.data.image_link };

        } catch (error) {

            console.error('Error en la API:', error);

            throw error;

        }

    }

};
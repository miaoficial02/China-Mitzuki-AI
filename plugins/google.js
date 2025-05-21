const fetch = require('node-fetch');

async function handler(conn, { message, args }) {
    if (!args[0]) {
        return await conn.sendMessage(message.key.remoteJid, {
            text: '❀ Por favor, proporciona un término de búsqueda para Google.',
            quoted: message
        });
    }

    const query = args.join(' ');
    const apiUrl = `https://delirius-apiofc.vercel.app/search/googlesearch?query=${encodeURIComponent(query)}`;

    try {
        await conn.sendMessage(message.key.remoteJid, {
            text: '🔎 Buscando en Google...',
            quoted: message
        });

        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result.status || !result.data.length) {
            return await conn.sendMessage(message.key.remoteJid, {
                text: '❌ No se encontraron resultados.',
                quoted: message
            });
        }

        let replyMessage = `🔍 *Resultados de la búsqueda:*\n\n`;
        result.data.slice(0, 3).forEach((item, index) => {
            replyMessage += `☁️ *${index + 1}. ${item.title}*\n`;
            replyMessage += `📰 *${item.description}*\n`;
            replyMessage += `🔗 [Enlace](${item.url})\n\n`;
        });

        await conn.sendMessage(message.key.remoteJid, {
            text: replyMessage,
            quoted: message
        });

    } catch (error) {
        console.error('Error en la solicitud a la API:', error);
        await conn.sendMessage(message.key.remoteJid, {
            text: '⚠️ Hubo un error al obtener los resultados de Google.',
            quoted: message
        });
    }
}

module.exports = {
    command: 'google',
    handler,
};
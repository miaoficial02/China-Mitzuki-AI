const yts = require('yt-search');

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '❀ Por favor, ingresa un término para buscar en YouTube.',

            quoted: message

        });

    }

    const query = args.join(' ');

    await conn.sendMessage(message.key.remoteJid, {

        text: '🔍 Buscando en YouTube...',

        quoted: message

    });

    try {

        let results = await yts(query);

        let videos = results.all.filter(v => v.type === 'video');

        if (!videos.length) {

            return await conn.sendMessage(message.key.remoteJid, {

                text: '❌ No se encontraron resultados en YouTube.',

                quoted: message

            });

        }

        let response = `🎶 *Resultados de búsqueda para:* ${query}\n\n`;

        videos.slice(0, 5).forEach((v, index) => {

            response += `*${index + 1}.* [${v.title}](${v.url})\n📺 *Canal:* ${v.author.name}\n🕝 *Duración:* ${v.timestamp}\n📆 *Subido:* ${v.ago}\n👀 *Vistas:* ${v.views}\n\n`;

        });

        await conn.sendMessage(message.key.remoteJid, {

            image: { url: videos[0].thumbnail },

            caption: response,

            quoted: message

        });

    } catch (error) {

        console.error('Error al realizar la búsqueda en YouTube:', error);

        await conn.sendMessage(message.key.remoteJid, {

            text: '⚠️ Hubo un error al obtener resultados de YouTube.',

            quoted: message

        });

    }

}

module.exports = {

    command: 'yts',

    handler,

};
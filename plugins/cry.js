
const axios = require('axios');

async function handler(conn, { message, args }) {
    if (args.length > 0) {
        await conn.sendMessage(message.key.remoteJid, {
            text: '*Uso correcto:* .cry\n_Usa el comando sin argumentos para llorar_',
            quoted: message
        });
        return;
    }
    let senderName = conn.getName(message.sender);
    let str = `${senderName} está llorando 😢`;

    const gifs = [
        'https://telegra.ph/file/f9f3d01fead147c9f6225.mp4',
        'https://telegra.ph/file/c91cb9c9793597b0ee341.mp4',
        'https://telegra.ph/file/f2f9e6bbdd0fab0b23961.mp4'
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    await conn.sendMessage(message.key.remoteJid, {
        video: { url: randomGif },
        gifPlayback: true,
        caption: str,
        mentions: [message.sender],
        quoted: message
    });
}

module.exports = {
    command: ['cry', 'llorar'],
    handler
};

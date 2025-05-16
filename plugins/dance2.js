
const axios = require('axios');

async function handler(conn, { message, args }) {
    if (args.length > 0) {
        await conn.sendMessage(message.key.remoteJid, {
            text: '*Uso correcto:* .dance2\n_Usa el comando sin argumentos para bailar_',
            quoted: message
        });
        return;
    }
    let senderName = conn.getName(message.sender);
    let str = `${senderName} está bailando 💃`;

    const gifs = [
        'https://telegra.ph/file/6f48a8d0f37a0a17c6435.mp4',
        'https://telegra.ph/file/fbfa5ac5d3f483a34f8c5.mp4',
        'https://telegra.ph/file/0243ccd08f8130c08c796.mp4'
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
    command: ['dance2', 'bailar2'],
    handler
};

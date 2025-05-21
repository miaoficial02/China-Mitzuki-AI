
const axios = require('axios');

async function handler(conn, { message }) {
    let who = message.quoted ? message.quoted.sender : 
              message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : 
              false;
              
    if (!who) {
        await conn.sendMessage(message.key.remoteJid, {
            text: '*Uso correcto:* .slap @usuario\n_Etiqueta a alguien para darle una bofetada_',
            quoted: message
        });
        return;
    }

    let name = conn.getName(who);
    let senderName = conn.getName(message.sender);
    let str = `${senderName} le dio una bofetada a ${name} 👋`;

    const gifs = [
        'https://telegra.ph/file/53d4a4674f5904458f33b.mp4',
        'https://telegra.ph/file/3c8d68ffc3fa5b8136e5c.mp4',
        'https://telegra.ph/file/8615a5ad1400a532b53e9.mp4'
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
    command: 'slap',
    handler
};

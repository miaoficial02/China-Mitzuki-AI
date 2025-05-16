const axios = require('axios');

async function handler(conn, { message }) {
    let who = message.quoted ? message.quoted.sender : 
              message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : 
              false;
              
    if (!who) {
        await conn.sendMessage(message.key.remoteJid, {
            text: 'Etiqueta o menciona a alguien para abrazarlo',
            quoted: message
        });
        return;
    }

    let name = conn.getName(who);
    let senderName = conn.getName(message.sender);
    let str = `${senderName} está abrazando a ${name} 🤗`;

    const gifs = [
        'https://telegra.ph/file/42d73b30c0c0d0f91aa43.mp4',
        'https://telegra.ph/file/16c2ec439de2514d195ce.mp4',
        'https://telegra.ph/file/c57aa3b897168493b0514.mp4'
    ];

    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

    await conn.sendMessage(message.key.remoteJid, {
        video: { url: randomGif },
        gifPlayback: true,
        caption: str,
        mentions: [message.sender, who],
        quoted: message
    });
}

module.exports = {
    command: ['hug', 'abrazar'],
    handler
};
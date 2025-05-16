const axios = require('axios');

async function handler(conn, { message }) {
    let who = message.quoted ? message.quoted.sender : 
              message.mentionedJid && message.mentionedJid[0] ? message.mentionedJid[0] : 
              false;
              
    if (!who) {
        await conn.sendMessage(message.key.remoteJid, {
            text: 'Etiqueta o menciona a alguien para darle un beso',
            quoted: message
        });
        return;
    }

    let name = conn.getName(who);
    let senderName = conn.getName(message.sender);
    let str = `${senderName} le dio un beso a ${name} 💋`;

    const gifs = [
        'https://telegra.ph/file/e3c40ec0634f55e0a2673.mp4',
        'https://telegra.ph/file/cd0eef3b352f41f51aa94.mp4',
        'https://telegra.ph/file/39d9db43b41c0bbf62c12.mp4'
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
    command: ['kiss', 'besar'],
    handler
};
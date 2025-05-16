const fs = require('fs');
const https = require('https');
const path = require('path');
const historyPath = './conversationHistory.json';

if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, JSON.stringify({}));
}

async function handler(conn, { message, args }) {
    const sender = message.key.participant || message.key.remoteJid;
    const query = args.join(' ');

    if (!query) {
        return conn.sendMessage(message.key.remoteJid, {
            text: 'Por favor, proporciona un texto para enviar a la IA 😑.',
            quoted: message
        });
    }

    await conn.sendPresenceUpdate('composing', message.key.remoteJid);
    await conn.readMessages([message.key]);

    let conversationHistory = JSON.parse(fs.readFileSync(historyPath, 'utf8'));

    if (!conversationHistory[sender]) {
        conversationHistory[sender] = [
            { role: 'system', content: 
            `Tomarás el rol de un bot de WhatsApp creado por Carlos. Tu nombre sera Shizuka, Tu idioma es el español, pero puedes responder en diferentes idiomas. tiene este rol que chat divertido con exploit incluido osea los quiere dices es que este rol solo es humor, divertido, no que tome nada real, tu respuesta sera divertida, humor, y usar mucho emojis en tu respuesta , también quiero que responas de la manera mas costa posible para evitar spam innecesario.

"general risa el chat por que este rol actúal más como simsimi" Chatbot no chatgpt. 

los quiere dices que tu respuesta sera humor puro, risa y un poco de amor.` }
        ];
    }

    conversationHistory[sender].push({ role: 'user', content: query });

    const data = JSON.stringify({
        contents: [{ parts: [{ text: conversationHistory[sender].map(msg => msg.content).join('\n\n') }] }]
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: '/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBrYQZ3s5IVrp-on-ewJON8Gj6ZoD_NWWI',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', async () => {
                try {
                    const responseJson = JSON.parse(responseData);
                    let replyText = responseJson?.candidates?.[0]?.content?.parts?.[0]?.text;

                    if (replyText) {
                        conversationHistory[sender].push({ role: 'assistant', content: replyText });
                        fs.writeFileSync(historyPath, JSON.stringify(conversationHistory, null, 2));
                        await conn.sendMessage(message.key.remoteJid, { 
                            text: replyText,
                            quoted: message 
                        });
                    } else {
                        await conn.sendMessage(message.key.remoteJid, {
                            text: "La IA no envió una respuesta válida. 🙀",
                            quoted: message
                        });
                    }
                    resolve();
                } catch (error) {
                    await conn.sendMessage(message.key.remoteJid, {
                        text: `Error al procesar la respuesta 😖: ${error.message}`,
                        quoted: message
                    });
                    reject(error);
                }
            });
        });

        req.on('error', async (error) => {
            await conn.sendMessage(message.key.remoteJid, {
                text: `Error de conexión con la IA 🤨: ${error.message}`,
                quoted: message
            });
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

module.exports = {
    command: 'ia',
    handler
};
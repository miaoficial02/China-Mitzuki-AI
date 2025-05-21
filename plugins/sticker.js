const axios = require('axios');

const { sticker } = require('../lib/sticker.js');

const { webp2png } = require('../lib/webp2mp4.js');

const uploadFile = require('../lib/uploadFile.js');

const uploadImage = require('../lib/uploadImage.js');

async function handler(conn, { message, args }) {

    let stiker = false;

    try {

        let q = message.quoted ? message.quoted : message;

        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp|image|video/g.test(mime)) {

            if (/video/g.test(mime) && (q.msg || q).seconds > 15) {

                return await conn.sendMessage(message.key.remoteJid, {

                    text: '✧ ¡El video no puede durar más de 15 segundos!...',

                    quoted: message

                });

            }

            let img = await q.download?.();

            if (!img) {

                return await conn.sendMessage(message.key.remoteJid, {

                    text: '❀ Por favor, envía una imagen o video para hacer un sticker.',

                    quoted: message

                });

            }

            let out;

            try {

                let userId = message.sender;

                let packstickers = global.db.data.users[userId] || {};

                let texto1 = packstickers.text1 || global.packsticker;

                let texto2 = packstickers.text2 || global.packsticker2;

                stiker = await sticker(img, false, texto1, texto2);

            } finally {

                if (!stiker) {

                    if (/webp/g.test(mime)) out = await webp2png(img);

                    else if (/image/g.test(mime)) out = await uploadImage(img);

                    else if (/video/g.test(mime)) out = await uploadFile(img);

                    if (typeof out !== 'string') out = await uploadImage(img);

                    stiker = await sticker(false, out, global.packsticker, global.packsticker2);

                }

            }

        } else if (args[0]) {

            if (isUrl(args[0])) {

                stiker = await sticker(false, args[0], global.packsticker, global.packsticker2);

            } else {

                return await conn.sendMessage(message.key.remoteJid, {

                    text: '⚠︎ El URL es incorrecto...',

                    quoted: message

                });

            }

        }

    } finally {

        if (stiker) {

            await conn.sendMessage(message.key.remoteJid, {

                sticker: { url: stiker },

                quoted: message

            });

        } else {

            return await conn.sendMessage(message.key.remoteJid, {

                text: '❀ Por favor, envía una imagen o video para hacer un sticker.',

                quoted: message

            });

        }

    }

}

module.exports = {

    command: 's',

    handler,

};

function isUrl(text) {

    return text.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/gi);

}
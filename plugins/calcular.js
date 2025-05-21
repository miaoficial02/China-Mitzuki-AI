const axios = require('axios');

async function handler(conn, { message, args }) {

    if (!args[0]) {

        return await conn.sendMessage(message.key.remoteJid, {

            text: '❀ Ingresa la ecuación.\nSímbolos compatibles: -, +, *, /, ×, ÷, π, e, (, )',

            quoted: message

        });

    }

    let val = args.join(' ')

        .replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')

        .replace(/×/g, '*')

        .replace(/÷/g, '/')

        .replace(/π|pi/gi, 'Math.PI')

        .replace(/e/gi, 'Math.E')

        .replace(/\/+/g, '/')

        .replace(/\++/g, '+')

        .replace(/-+/g, '-');

    let format = val

        .replace(/Math\.PI/g, 'π')

        .replace(/Math\.E/g, 'e')

        .replace(/\//g, '÷')

        .replace(/\*/g, '×');

    try {

        let result = (new Function('return ' + val))();

        if (!result) throw result;

        await conn.sendMessage(message.key.remoteJid, {

            text: `*${format}* = _${result}_`,

            quoted: message

        });

    } catch (error) {

        await conn.sendMessage(message.key.remoteJid, {

            text: '❌ Formato incorrecto. Solo puedes usar: -, +, *, /, ×, ÷, π, e, (, )',

            quoted: message

        });

    }

}

module.exports = {

    command: 'cal',

    handler,

};
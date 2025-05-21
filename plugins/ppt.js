
async function handler(conn, { message, args }) {
    const opciones = ['piedra', 'papel', 'tijera'];
    const eleccionBot = opciones[Math.floor(Math.random() * 3)];
    const eleccionUser = args[0]?.toLowerCase();

    if (!eleccionUser || !opciones.includes(eleccionUser)) {
        return conn.sendMessage(message.key.remoteJid, {
            text: '🎮 Elige: piedra, papel o tijera',
            quoted: message
        });
    }

    let resultado = '';
    if (eleccionUser === eleccionBot) resultado = 'Empate! 🤝';
    else if (
        (eleccionUser === 'piedra' && eleccionBot === 'tijera') ||
        (eleccionUser === 'papel' && eleccionBot === 'piedra') ||
        (eleccionUser === 'tijera' && eleccionBot === 'papel')
    ) resultado = 'Ganaste! 🎉';
    else resultado = 'Perdiste! 😢';

    await conn.sendMessage(message.key.remoteJid, {
        text: `🎮 *PIEDRA PAPEL TIJERA*\n\nTú: ${eleccionUser}\nBot: ${eleccionBot}\n\n${resultado}`,
        quoted: message
    });
}

module.exports = {
    command: 'ppt',
    handler
};

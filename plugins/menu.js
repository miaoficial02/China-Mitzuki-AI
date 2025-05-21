const fs = require('fs');
const path = require('path');
const { users, comads } = require('../main.js');

const sendMessage = async (conn, to, message, options = {}, additionalOptions = {}) => {
    try {
        await conn.sendMessage(to, message, additionalOptions);
    } catch (error) {
        console.error('Error enviando el mensaje:', error);
    }
};

async function handler(conn, { message }) {
    const botPrefix = '.';
    const totalPlugins = 46; // Número total de plugins/comandos

    // Obtener la hora actual en Cuba
    const hora = new Date().getHours();
    let saludo = '';

    if (hora >= 5 && hora < 12) {
        saludo = '¡Buenos días';
    } else if (hora >= 12 && hora < 19) {
        saludo = '¡Buenas tardes';
    } else {
        saludo = '¡Buenas noches';
    }

    // Obtener el nombre del usuario
    const pushName = message.pushName || 'usuario';

    const menuCaption = `
𝚂𝚑𝚒𝚣𝚞𝚔𝚊-𝙰𝙸
━━━━━━━━━━━━━━━
${saludo} ${pushName}! ✨
✨ 𝙈𝙚𝙣𝙪 - 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡 
   ➻ Total plugins: ${totalPlugins}
   ➻ Prefijo actual: ${botPrefix}
   📅 *Fecha:* ${new Date().toLocaleDateString('es-ES', { timeZone: 'America/Havana', day: '2-digit', month: '2-digit', year: 'numeric' })}
   ⌚ *Hora:* ${new Date().toLocaleTimeString('es-ES', { timeZone: 'America/Havana', hour: '2-digit', minute: '2-digit' })}
━━━━━━━━━━━━━━━
╭━━━〔 *🤖 IA & BÚSQUEDA* 〕
┃ ❏ ${botPrefix}ia • Chatear con la IA
┃ ❏ ${botPrefix}google • Buscar en Google
┃ ❏ ${botPrefix}pin • Buscar en pinterest
┃ ❏ ${botPrefix}dalle • Genera imagenes
┃ ❏ ${botPrefix}flux • Crea imagenes
┃ ❏ ${botPrefix}clima • Ver el clima actual
┃ ❏ ${botPrefix}bingsearch • Buscar en Bing
╰━━━━━━━━━━⬣

╭━━━〔 *🎵 MULTIMEDIA* 〕
┃ ❏ ${botPrefix}play • Reproducir música MP3
┃ ❏ ${botPrefix}play2 • Reproducir música MP4
┃ ❏ ${botPrefix}tiktok • Descargar video de TikTok
╰━━━━━━━━━━⬣

╭━━━〔 *🎮 ANIME & +18* 〕
┃ ❏ ${botPrefix}anime • Ver imágenes de anime
┃ ❏ ${botPrefix}waifu • Ver imagen de waifu
┃ ❏ ${botPrefix}cosplay • Ver fotos de cosplay
┃ ❏ ${botPrefix}nsfw • Contenido +18
┃ ❏ ${botPrefix}pack • Pack de imágenes
┃ ❏ ${botPrefix}pussy • Ver pussy anime
┃ ❏ ${botPrefix}neko • Ver neko anime +18
┃ ❏ ${botPrefix}tetas •Ver imagenes de tetas
╰━━━━━━━━━━⬣

╭━━━〔 *🎮 JUEGOS* 〕
┃ ❏ ${botPrefix}trivia • Jugar trivia
┃ ❏ ${botPrefix}ppt • Piedra, papel o tijera
┃ ❏ ${botPrefix}reto • Recive un reto
┃ ❏ ${botPrefix}verdad • El bot te hace una pregunta
╰━━━━━━━━━━⬣

╭━━━〔 *😄 DIVERSIÓN* 〕
┃ ❏ ${botPrefix}meme • Ver memes random
┃ ❏ ${botPrefix}fact • Datos curiosos
┃ ❏ ${botPrefix}joke • Chistes en inglés
╰━━━━━━━━━━⬣

╭━━━〔 *👑 ADMIN* 〕
┃ ❏ ${botPrefix}add • Agregar participante
┃ ❏ ${botPrefix}kick • Expulsar participante
┃ ❏ ${botPrefix}promote • Dar admin
┃ ❏ ${botPrefix}demote • Quitar admin
╰━━━━━━━━━━⬣

╭━━━〔 *⚙️ SISTEMA* 〕
┃ ❏ ${botPrefix}menu • Ver este menú
┃ ❏ ${botPrefix}update • Actualizar bot
┃ ❏ ${botPrefix}logs • Ver registros
╰━━━━━━━━━━⬣
`;

    try {
        const thumbnailBuffer = fs.readFileSync('./media/menu.jpg');

        await conn.sendMessage(message.key.remoteJid, {
            image: thumbnailBuffer,
            caption: menuCaption,
            quoted: message
        });
    } catch (err) {
        console.log('Error al enviar el menú:', err);
        await sendMessage(conn, message.key.remoteJid, { text: 'Error al enviar el menú.' });
    }
}

module.exports = {
    command: 'menu',
    handler,
};

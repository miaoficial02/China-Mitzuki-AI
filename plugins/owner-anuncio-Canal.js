import { createHash } from 'crypto';

const handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    if (!isOwner) {
        return m.reply('🚫 *Acceso denegado*: Este comando solo puede ser usado por el owner del bot');
    }

    if (!text) {
        return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <mensaje>\n\nEjemplo:\n${usedPrefix + command} Anuncio importante: Mañana habrá mantenimiento`);
    }

    const channelID = '120363400241973967@newsletter';

    try {
        await conn.relayMessage(channelID, {
            messageContextInfo: {
                forwardingScore: 999,
                isForwarded: true
            },
            extendedTextMessage: {
                text: text,
                contextInfo: {
                    mentionedJid: [conn.user.jid],
                    externalAdReply: {
                        title: '📢 Anuncio Oficial',
                        body: `Publicado por ${await conn.getName(conn.user.jid)}`,
                        thumbnailUrl: 'https://qu.ax/GoxWU.jpg',
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        sourceUrl: 'https://chat.whatsapp.com/EnlaceDeGrupoValido'
                    }
                }
            }
        }, {});

        // Enviar botones al owner confirmando el envío
        const buttons = [
            { buttonId: 'menu', buttonText: { displayText: '📋 Menú' }, type: 1 },
            { buttonId: 'estado', buttonText: { displayText: '📈 Estado' }, type: 1 }
        ];

        const buttonMessage = {
            text: `✅ *Mensaje enviado exitosamente al canal*\n\n📝 *Contenido:* ${text}`,
            footer: 'Bot Operativo • Canal Oficial',
            buttons: buttons,
            headerType: 1
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    } catch (error) {
        console.error('❌ Error al enviar al canal:', error);
        await m.reply('❌ *Ocurrió un error al enviar el mensaje al canal*');
    }
};

handler.help = ['enviarcanal <mensaje>'];
handler.tags = ['owner'];
handler.command = ['enviarcanal', 'sendchannel', 'canal'];
handler.owner = true;

export default handler;
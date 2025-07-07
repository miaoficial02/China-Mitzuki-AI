import { createHash } from 'crypto'

const handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    // Verificar si es el owner
    if (!isOwner) {
        return m.reply('🚫 *Acceso denegado*: Este comando solo puede ser usado por el owner del bot');
    }

    // Validar que se proporcione un mensaje
    if (!text) {
        return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <mensaje>\n\nEjemplo:\n${usedPrefix + command} Anuncio importante: Mañana habrá mantenimiento`);
    }

    // ID del canal (reemplaza con tu ID real)
    const channelID = '120363400241973967@newsletter';

    try {
        // Enviar mensaje al canal como si fuera reenviado
        await conn.relayMessage(channelID, {
            extendedTextMessage: {
                text: text,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 999,
                    participant: conn.user.jid,
                    mentionedJid: [conn.user.jid],
                    externalAdReply: {
                        title: '📢 Anuncio Oficial',
                        body: `Publicado por ${conn.getName(conn.user.jid)}`,
                        thumbnailUrl: 'https://telegra.ph/file/6543d1b4c0f6e50a61d0a.jpg',
                        mediaType: 1,
                        sourceUrl: 'https://chat.whatsapp.com/...'
                    }
                }
            }
        }, {});

        // Confirmación al owner
        await m.reply(`✅ *Mensaje enviado exitosamente al canal*\n\nContenido:\n${text}`);
        
    } catch (error) {
        console.error('Error al enviar al canal:', error);
        await m.reply('❌ *Error al enviar el mensaje al canal*');
    }
};

handler.help = ['enviarcanal <mensaje>'];
handler.tags = ['owner'];
handler.command = ['enviarcanal', 'sendchannel', 'canal'];
handler.owner = true;

export default handler;
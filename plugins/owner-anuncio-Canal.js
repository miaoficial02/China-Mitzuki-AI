import { createHash } from 'crypto';

const handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    if (!isOwner) {
        return m.reply('🚫 *Acceso denegado*: Este comando solo puede ser usado por el owner del bot');
    }

    if (!text) {
        return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <mensaje>\n\nEjemplo:\n${usedPrefix + command} Anuncio importante: Mantenimiento mañana a las 10:00 AM`);
    }

    // ⚠️ Usa el JID exacto del canal obtenido desde conn.chats
    const channelID = '120363400241973967@newsletter'; // ← confirma que este sea el real

    try {
        // Enviar mensaje enriquecido al canal
        await conn.sendMessage(channelID, {
            text: text,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                mentionedJid: [conn.user.jid],
                externalAdReply: {
                    title: '📢 Anuncio Oficial',
                    body: `Publicado por ${await conn.getName(conn.user.jid)}`,
                    thumbnailUrl: 'https://qu.ax/GoxWU.jpg',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    sourceUrl: 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v'
                }
            }
        });

        // Confirmación interactiva al owner
        await conn.sendMessage(m.chat, {
            text: `✅ *Mensaje enviado exitosamente al canal*`,
            footer: '📝 Contenido: ' + text,
            buttons: [
                { buttonId: 'menu', buttonText: { displayText: '📋 Menú' }, type: 1 },
                { buttonId: 'estado', buttonText: { displayText: '📈 Estado' }, type: 1 }
            ],
            headerType: 1
        }, { quoted: m });

    } catch (error) {
        console.error('❌ Error al enviar al canal:', error);
        await m.reply('❌ *Ocurrió un error al enviar el mensaje al canal*. Puede que el canal no acepte mensajes directos o que el JID esté incorrecto.');
    }
};

handler.help = ['enviarcanal <mensaje>'];
handler.tags = ['owner'];
handler.command = ['enviarcanal', 'sendchannel', 'canal'];
handler.owner = true;

export default handler;
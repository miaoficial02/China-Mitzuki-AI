const handler = async (m, { conn, usedPrefix, command }) => {
    // Emojis para mensajes (personalízalos)
    const emoji = '🚫';
    const emoji2 = '⚠️';
    
    // Verificar si se mencionó o se respondió a un usuario
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(
            m.chat, 
            `${emoji} *Debes mencionar o responder al usuario que quieres expulsar.*\n\nEjemplo: *${usedPrefix + command} @usuario*`, 
            m
        );
    }

    // Obtener el JID del usuario a expulsar
    const user = m.mentionedJid[0] || m.quoted.sender;
    
    // Obtener metadatos del grupo
    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'; // Ajusta según tu estructura de dueño
    
    // Validaciones críticas
    if (user === conn.user.jid) {
        return conn.reply(m.chat, `${emoji2} *No puedo expulsarme a mí mismo.*`, m);
    }
    if (user === ownerGroup) {
        return conn.reply(m.chat, `${emoji2} *No puedo expulsar al propietario del grupo.*`, m);
    }
    if (user === ownerBot) {
        return conn.reply(m.chat, `${emoji2} *No puedo expulsar a mi creador.*`, m);
    }

    try {
        // Verificar si el bot es administrador
        const isBotAdmin = groupInfo.participants.find(p => p.id === conn.user.jid)?.admin;
        if (!isBotAdmin) {
            return conn.reply(m.chat, `${emoji2} *¡Necesito ser administrador para expulsar usuarios!*`, m);
        }

        // Expulsar al usuario
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
        
        // Notificar al grupo
        const userName = await conn.getName(user);
        const adminName = await conn.getName(m.sender);
        await conn.sendMessage(
            m.chat, 
            { 
                text: `${emoji} *@${adminName}* expulsó a *@${userName}* del grupo.`, 
                mentions: [user, m.sender] 
            }, 
            { quoted: m }
        );
    } catch (error) {
        console.error('Error al expulsar:', error);
        conn.reply(
            m.chat, 
            `${emoji2} *Ocurrió un error al expulsar al usuario.*\n\nRazón: ${error.message}`, 
            m
        );
    }
};

// Configuración del comando
handler.help = ['kick @usuario'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar', 'ban', 'sacar'];
handler.admin = true; // Solo admins del grupo pueden usarlo
handler.group = true; // Solo funciona en grupos
handler.botAdmin = false; // El bot debe ser admin

export default handler;

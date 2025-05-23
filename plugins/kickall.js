async function handler(conn, { message }) {
    if (!message.key.remoteJid.endsWith('@g.us')) {
        return conn.sendMessage(message.key.remoteJid, { 
            text: '⚠️ Este comando solo funciona en grupos',
            quoted: message
        });
    }
    
    try {
        const groupMetadata = await conn.groupMetadata(message.key.remoteJid);
        const isAdmin = groupMetadata.participants.find(p => p.id === message.key.participant)?.admin;
        
        if (!isAdmin) {
            return conn.sendMessage(message.key.remoteJid, { 
                text: '⚠️ Necesitas ser administrador',
                quoted: message  
            });
        }

        const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        const members = groupMetadata.participants
            .filter(p => !p.admin && p.id !== botId)
            .map(p => p.id);

        if (members.length === 0) {
            return conn.sendMessage(message.key.remoteJid, {
                text: '⚠️ No hay miembros para eliminar',
                quoted: message
            });
        }

        await conn.sendMessage(message.key.remoteJid, {
            text: '🚨 Iniciando eliminación masiva...',
            quoted: message
        });

        for (const member of members) {
            await conn.groupParticipantsUpdate(message.key.remoteJid, [member], 'remove');
            // Pequeña pausa para evitar spam
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await conn.sendMessage(message.key.remoteJid, {
            text: '✅ Eliminación masiva completada',
            quoted: message
        });

    } catch (error) {
        console.error('Error en kickall:', error);
        await conn.sendMessage(message.key.remoteJid, {
            text: '❌ No se pudo completar la eliminación masiva',
            quoted: message
        });
    }
}

module.exports = {
    command: 'kickall',
    help: '.kickall - Elimina a todos los miembros del grupo (excepto admins)',
    tags: ['admin'],
    handler
};
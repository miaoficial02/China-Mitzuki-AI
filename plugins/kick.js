
const handler = async (conn, { message }) => {
    if (!message.key.remoteJid.endsWith('@g.us')) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Este comando solo funciona en grupos' });
    
    try {
        const groupMetadata = await conn.groupMetadata(message.key.remoteJid);
        const isAdmin = groupMetadata.participants.find(p => p.id === message.key.participant)?.admin;
        
        if (!isAdmin) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Necesitas ser administrador' });
        
        const user = message.message.extendedTextMessage?.contextInfo?.participant || message.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        
        if (!user) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Menciona al usuario que deseas expulsar' });
        
        await conn.groupParticipantsUpdate(message.key.remoteJid, [user], 'remove');
        conn.sendMessage(message.key.remoteJid, { text: '✅ Usuario expulsado exitosamente' });
    } catch (error) {
        conn.sendMessage(message.key.remoteJid, { text: '❌ No se pudo expulsar al usuario' });
    }
};

module.exports = {
    command: 'kick',
    handler
};

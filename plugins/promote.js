
const handler = async (conn, { message }) => {
    if (!message.key.remoteJid.endsWith('@g.us')) {
        return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Este comando solo funciona en grupos' });
    }
    
    try {
        const groupMetadata = await conn.groupMetadata(message.key.remoteJid);
        const participant = message.key.participant || message.key.remoteJid;
        const isAdmin = groupMetadata.participants.find(p => p.id === participant)?.admin === 'admin';
        
        if (!isAdmin) {
            return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Necesitas ser administrador' });
        }

        let user;
        if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            user = message.message.extendedTextMessage.contextInfo.participant;
        } else if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]) {
            user = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        
        if (!user) {
            return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Menciona o responde al mensaje del usuario que deseas promover' });
        }
        
        await conn.groupParticipantsUpdate(message.key.remoteJid, [user], 'promote');
        await conn.sendMessage(message.key.remoteJid, { text: '✅ Usuario promovido a admin exitosamente' });
    } catch (error) {
        console.error('Error en promote:', error);
        await conn.sendMessage(message.key.remoteJid, { text: '❌ No se pudo promover al usuario' });
    }
};

module.exports = {
    command: 'promote',
    handler
};

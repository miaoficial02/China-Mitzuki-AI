
const handler = async (conn, { message, args }) => {
    if (!message.key.remoteJid.endsWith('@g.us')) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Este comando solo funciona en grupos' });
    
    try {
        const groupMetadata = await conn.groupMetadata(message.key.remoteJid);
        const isAdmin = groupMetadata.participants.find(p => p.id === message.key.participant)?.admin;
        
        if (!isAdmin) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Necesitas ser administrador' });
        
        if (!args[0]) return conn.sendMessage(message.key.remoteJid, { text: '⚠️ Ingresa el número que deseas agregar\nEjemplo: .add 535xxxxxxx' });
        
        let user = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await conn.groupParticipantsUpdate(message.key.remoteJid, [user], 'add');
        
        conn.sendMessage(message.key.remoteJid, { text: '✅ Usuario agregado exitosamente' });
    } catch (error) {
        conn.sendMessage(message.key.remoteJid, { text: '❌ No se pudo agregar al usuario' });
    }
};

module.exports = {
    command: 'add',
    handler
};

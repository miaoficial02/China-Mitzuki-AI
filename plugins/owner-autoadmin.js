const handler = async (m, { conn, isAdmin, groupMetadata }) => {
    // Emojis y mensajes (personalizables)
    const emoji = '⚠️';
    const done = '✅';
    const msm = '❌';
    
    // Verificar si el remitente ya es admin
    if (isAdmin) {
        await m.react(msm);
        return m.reply(`${emoji} *Ya eres administrador del grupo.*`);
    }

    try {
        // Verificar si el bot es admin (requerido para promover)
        const botAdmin = groupMetadata.participants.find(p => p.id === conn.user.jid)?.admin;
        if (!botAdmin) {
            await m.react(msm);
            return m.reply(`${msm} *¡Necesito ser administrador para darte permisos!*`);
        }

        // Promover al remitente a admin
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
        await m.react(done);
        m.reply(`${done} *¡Ahora mi creador es admin del grupo!* \n _¡Respeten perras!_ `);
        
    } catch (error) {
        console.error('Error en autoadmin:', error);
        await m.react(msm);
        m.reply(`${msm} *Ocurrió un error al intentar hacerte admin.*\n\nRazón: ${error.message}`);
    }
};

// Configuración del comando
handler.tags = ['group'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true; // Solo el dueño del bot puede usarlo
handler.group = true;  // Solo funciona en grupos
handler.botAdmin = true; // Requiere que el bot sea admin

export default handler;

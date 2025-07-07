let handler = m => m
handler.before = async function (m, { conn, isBotAdmin }) {
    if (!m.isGroup) return; // Solo actuar en grupos
    
    const chat = global.db.data.chats[m.chat];
    if (!isBotAdmin) return; // Verificar si el bot es admin

    try {
        // 1. Auto-Rechazar números de ciertos países
        if (chat.autoRechazar) {
            const prefijosRechazo = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48'];
            if (prefijosRechazo.some(prefix => m.sender.startsWith(prefix))) {
                await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject');
                console.log(`[AUTO-RECHAZO] Número ${m.sender} rechazado`);
            }
        }

        // 2. Auto-Aceptar números que comienzan con 5
        if (chat.autoAceptar) {
            // Aceptar solicitudes pendientes
            const solicitudesPendientes = await conn.groupRequestParticipantsList(m.chat);
            const usuariosAceptar = solicitudesPendientes
                .filter(p => p.jid?.includes('@s.whatsapp.net') && p.jid.split('@')[0].startsWith('5'))
                .map(p => p.jid);

            for (const usuario of usuariosAceptar) {
                await conn.groupRequestParticipantsUpdate(m.chat, [usuario], "approve");
                console.log(`[AUTO-ACEPTADO] Usuario ${usuario} aceptado`);
            }

            // Aceptar nuevos miembros (evento de entrada)
            if (m.messageStubType === 172 && m.messageStubParameters?.[0]?.includes('@s.whatsapp.net')) {
                const nuevoMiembro = m.messageStubParameters[0];
                if (nuevoMiembro.split('@')[0].startsWith('5')) {
                    await conn.groupRequestParticipantsUpdate(m.chat, [nuevoMiembro], "approve");
                    console.log(`[NUEVO MIEMBRO] Usuario ${nuevoMiembro} aceptado automáticamente`);
                }
            }
        }

        // 3. Anti-Fake: Bloquear y eliminar números sospechosos
        if (chat.antifake) {
            const prefijosFake = ['6', '90', '212', '92', '93', '94', '7', '49', '2', '91', '48'];
            if (prefijosFake.some(prefix => m.sender.startsWith(prefix))) {
                global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
                global.db.data.users[m.sender].block = true;
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                console.log(`[ANTI-FAKE] Usuario ${m.sender} bloqueado y eliminado`);
            }
        }
    } catch (error) {
        console.error('[ERROR] En el manejo de participantes:', error);
    }
}

export default handler
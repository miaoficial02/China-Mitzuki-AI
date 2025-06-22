//---Creado por Carlos
//---https://github.com/Kone457
import fetch from 'node-fetch';

// Definir constantes para emojis y mensajes
const emoji = '🤖';
const rwait = '⏳';
const msm = '⚠️';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor, haga su pregunta para poder responder.`, m);
    
    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);
        
        var apii = await fetch(`https://api.vreden.my.id/api/simi?query=${encodeURIComponent(text)}`);
        if (!apii.ok) throw new Error(`API request failed with status ${apii.status}`);
        
        var res = await apii.json();
        if (!res.result) throw new Error('No se recibió una respuesta válida de la API.');
        
        await m.reply(res.result);
        await m.react('✅');
    } catch (error) {
        console.error('Error en el handler de Simi:', error);
        await m.react('❌');
        await conn.reply(m.chat, `${msm} Lo siento, ocurrió un error al procesar tu pregunta.`, m);
    }
};

handler.command = ['simi', 'simsimi'];
handler.help = ['simi <pregunta>', 'simsimi <pregunta>'];
handler.tags = ['ai', 'chat'];
handler.group = true;

export default handler;

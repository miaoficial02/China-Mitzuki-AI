import fetch from 'node-fetch';

// Emojis y mensajes
const emoji = '🤖';
const rwait = '⏳';
const msm = '⚠️';

var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Por favor, haz tu pregunta.`, m);
    
    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);

        // URL de la API (alternativa por si la principal falla)
        const apiUrl = `https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=es`;
        // Opción alternativa: `https://api.vreden.my.id/api/simi?query=${encodeURIComponent(text)}`

        const response = await fetch(apiUrl, {
            headers: { 'Accept': 'application/json' },
            timeout: 10000 // 10 segundos máximo de espera
        });

        if (!response.ok) throw new Error(`Error en la API: ${response.status}`);

        const data = await response.json();
        
        // Manejar diferentes formatos de respuesta (SimSimi puede variar)
        const reply = data.response || data.result || data.message || "No entendí tu pregunta.";
        
        await m.reply(reply);
        await m.react('✅');
    } catch (error) {
        console.error('Error en el comando "simi":', error);
        await m.react('❌');
        await conn.reply(m.chat, `${msm} No pude contactar a SimSimi. ¿Intentas más tarde?`, m);
    }
};

handler.command = ['simi', 'simsimi'];
handler.help = ['simi <pregunta> - Habla con SimSimi'];
handler.tags = ['ai', 'fun'];
handler.group = true;

export default handler;

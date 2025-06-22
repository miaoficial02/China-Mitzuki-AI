import fetch from 'node-fetch';

// Configuración
const emoji = '🤖';
const rwait = '⏳';
const msm = '⚠️';

var handler = async (m, { text, conn }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Escribe tu pregunta. Ejemplo: *!simi Hola*`, m);
    
    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);

        // Timeout manual para evitar bloqueos
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Tiempo de espera agotado (10s)')), 10000)
        );

        // API alternativa (SimSimi oficial)
        const apiUrl = `https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=es`;
        
        const fetchPromise = fetch(apiUrl, {
            headers: { 'Content-Type': 'application/json' }
        });

        // Race: fetch vs timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();

        // Respuesta adaptativa
        const reply = data.message || data.response || "No puedo responder ahora 😢";
        await m.reply(reply);
        await m.react('✅');

    } catch (error) {
        console.error('DEBUG ERROR:', error); // Debug detallado
        await m.react('❌');
        await conn.reply(m.chat, `${msm} Error: ${error.message}`, m);
    }
};

// Comandos y metadata
handler.command = ['simi', 'bot'];
handler.help = ['simi <texto> - Chatea con SimSimi'];
handler.tags = ['ai'];
export default handler;

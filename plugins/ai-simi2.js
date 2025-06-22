import fetch from 'node-fetch';

const emoji = '🤖';
const rwait = '⏳';
const msm = '⚠️';

var handler = async (m, { text }) => {
    if (!text) return m.reply(`${emoji} Escribe algo. Ejemplo: *!simi Hola*`);

    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);

        // API alternativa (SimSimi oficial con POST)
        const apiUrl = 'https://api.simsimi.vn/v2/simtalk';
        
        const response = await fetch(apiUrl, {
            method: 'POST',  // ¡Importante! Esta API usa POST
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                lc: 'es'
            }),
            timeout: 8000
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        
        const data = await response.json();
        const reply = data.message || "No puedo responder ahora 😢";
        
        await m.reply(reply);
        await m.react('✅');

    } catch (error) {
        console.error('Error en SimSimi:', error);
        await m.react('❌');
        await m.reply(`${msm} *Error:*\n${error.message}\n\nPrueba con otra pregunta.`);
    }
};

handler.command = ['simi', 'bot'];
handler.help = ['simi <texto> - Chatea con IA'];
export default handler;

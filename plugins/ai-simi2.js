import fetch from 'node-fetch';

const emoji = '🤖';
const rwait = '⏳';
const msm = '⚠️';

var handler = async (m, { text }) => {
    if (!text) return m.reply(`${emoji} Escribe tu mensaje. Ejemplo: *!simi Hola*`);

    try {
        await m.react(rwait);
        conn.sendPresenceUpdate('composing', m.chat);

        // API alternativa funcional (puedes reemplazarla)
        const apiUrl = `https://api.simsimi.fun/v2/?text=${encodeURIComponent(text)}&lang=es`;
        
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            },
            timeout: 5000
        });

        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        const data = await response.json();
        const reply = data.success || data.response || "No puedo responder ahora 😅";
        
        await m.reply(reply);
        await m.react('✅');

    } catch (error) {
        console.error('Error en SimSimi:', error);
        await m.react('❌');
        // Respuestas predeterminadas si falla la API
        const defaultReplies = [
            "No entendí bien, ¿puedes reformular?",
            "¡Vaya! Se me olvidó qué responder 😅",
            "Creo que mi cerebro IA necesita café ☕"
        ];
        const randomReply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
        await m.reply(`${msm} *Error:* ${error.message}\n${randomReply}`);
    }
};

handler.command = ['simi', 'bot', 'ia'];
handler.help = ['simi <texto> - Chatea con inteligencia artificial'];
export default handler;

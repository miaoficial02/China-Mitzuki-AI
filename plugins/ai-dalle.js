import axios from 'axios';

// Configuración
const emoji = '🎨';
const emoji2 = '⏳';
const msm = '⚠️';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, `${emoji} Por favor, escribe una descripción. Ejemplo: *!dalle un gato astronauta*`, m);
    }

    const prompt = encodeURIComponent(args.join(' '));
    const apiUrl = `https://api.vreden.my.id/api/artificial/text2image?prompt=${prompt}`;

    try {
        await conn.sendPresenceUpdate('composing', m.chat);
        const waitMsg = await conn.reply(m.chat, `${emoji2} Generando imagen: "${args.join(' ')}"...`, m);

        const response = await axios.get(apiUrl, { 
            responseType: 'arraybuffer',
            timeout: 30000 // 30 segundos de timeout
        });

        if (!response.data || response.data.length < 1024) {
            throw new Error('La imagen devuelta es demasiado pequeña o inválida');
        }

        await conn.sendMessage(m.chat, { 
            image: Buffer.from(response.data),
            caption: `🖌️ Prompt: "${args.join(' ')}"`
        }, { quoted: m });
        
        await conn.sendMessage(m.chat, { delete: waitMsg.key });

    } catch (error) {
        console.error('Error en !dalle:', error);
        await conn.reply(m.chat, `${msm} Error al generar: ${error.message}\nPrueba con otro prompt o más tarde.`, m);
    }
};

// Comandos
handler.command = ['dalle', 'aiimg', 'imagenia'];
handler.help = ['dalle <descripción> - Genera imágenes con IA'];
handler.tags = ['ia', 'imagen'];
handler.limit = true; // Opcional: Limitar uso frecuente

export default handler;

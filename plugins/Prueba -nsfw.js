import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
    // Mensaje de espera
    const waitMsg = await conn.reply(m.chat, '🔄 Cargando imagen...', m);
    
    try {
        // Opciones de la API
        const apiUrl = 'https://delirius-apiofc.vercel.app/nsfw/girls';
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error(`API respondió con estado ${response.status}`);
        
        // Obtener la URL de la imagen
        const data = await response.json();
        if (!data.url || !data.url.match(/\.(jpe?g|png|gif)$/i)) {
            throw new Error('Respuesta de API no contiene una imagen válida');
        }
        
        // Enviar la imagen con marca de agua
        await conn.sendFile(m.chat, data.url, 'imagen.jpg', 
            `🌸 *Imagen generada por* ${conn.getName(m.sender)}\n` +
            `🔗 *Enlace:* ${data.url}\n` +
            `📛 *Uso:* ${usedPrefix + command}`,
            m
        );
        
        // Eliminar mensaje de espera
        await conn.sendMessage(m.chat, { delete: waitMsg.key });
        
    } catch (error) {
        console.error('Error en el plugin girls:', error);
        
        // Manejo de errores
        await conn.reply(m.chat, 
            `❌ Error al obtener la imagen:\n` +
            `${error.message}\n\n` +
            `Prueba de nuevo más tarde o usa *${usedPrefix}reporte* para notificar el problema.`,
            m
        );
        
        // Mantener el mensaje de espera para contexto
        await conn.sendMessage(m.chat, { 
            text: '⚠️ Se produjo un error (ver arriba)',
            delete: waitMsg.key 
        });
    }
};

// Configuración del comando
handler.help = ['girls'];
handler.tags = ['anime', 'imagen'];
handler.command = 'girls';
handler.limit = true; // Limitar uso excesivo
handler.register = true; // Opcional: Registrar como plugin oficial

export default handler;

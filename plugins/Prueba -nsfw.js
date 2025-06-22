import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, command }) => {
    // Reacciones iniciales
    await conn.sendMessage(m.chat, { 
        react: { 
            text: '⏳', 
            key: m.key 
        }
    });

    try {
        const apiUrl = 'https://delirius-apiofc.vercel.app/nsfw/girls';
        
        // 1. Verificar si la API está activa
        await conn.sendMessage(m.chat, { 
            react: { 
                text: '🔍', 
                key: m.key 
            }
        });
        
        const checkApi = await fetch(apiUrl, { method: 'HEAD' });
        if (!checkApi.ok) throw new Error('API no responde');
        
        // 2. Descargar imagen con indicador
        await conn.sendMessage(m.chat, { 
            react: { 
                text: '📥', 
                key: m.key 
            }
        });
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        
        // 3. Validar que sea imagen
        const contentType = response.headers.get('content-type');
        if (!contentType?.startsWith('image/')) throw new Error('Formato no soportado');
        
        // 4. Enviar imagen con reacción de éxito
        await conn.sendFile(m.chat, apiUrl, 'girl.jpg', 
            `✨ *Imagen generada*\n` + 
            `🔗 ${apiUrl}\n` +
            `💖 Reacciona con 👍 si te gustó`,
            m
        );
        
        await conn.sendMessage(m.chat, { 
            react: { 
                text: '✅', 
                key: m.key 
            }
        });

    } catch (error) {
        // Reacción de error y mensaje
        await conn.sendMessage(m.chat, { 
            react: { 
                text: '❌', 
                key: m.key 
            }
        });
        
        await conn.reply(m.chat, 
            `⚠️ *Error*\n` +
            `${error.message}\n\n` +
            `Prueba con:\n` +
            `• *${usedPrefix}reload* - Recargar plugin\n` +
            `• *${usedPrefix}reporte* - Notificar error`,
            m
        );
        
        // Reacción adicional para diagnóstico
        await conn.sendMessage(m.chat, { 
            react: { 
                text: '⁉️', 
                key: m.key 
            }
        });
    }
};

// Configuración
handler.help = ['girls'];
handler.tags = ['anime', 'imagen'];
handler.command = 'xx';
handler.limit = true;

export default handler;

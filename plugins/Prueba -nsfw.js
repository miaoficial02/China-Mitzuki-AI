let user = global.db.data.users[userId]
    let name = conn.getName(userId)

import fetch from 'node-fetch';

// Emojis para reacciones
const REACTIONS = {
  waiting: '⏳',
  checking: '🔍',
  downloading: '📥',
  success: '✅',
  error: '❌',
  warning: '⚠️'
};

const handler = async (m, { conn, usedPrefix, command }) => {
  // 1. Reacción inicial
  await react(m, REACTIONS.waiting);

  try {
    // Lista de APIs alternativas (prioridad descendente)
    const imageAPIs = [
      {
        name: "Delirius-API",
        url: "https://delirius-apiofc.vercel.app/nsfw/girls",
        method: "direct" // Intenta descargar directamente
      },
      {
        name: "Waifu-Pics",
        url: "https://api.waifu.pics/sfw/waifu",
        method: "json" // Necesita extraer URL de JSON
      },
      {
        name: "Nekos-Best",
        url: "https://nekos.best/api/v2/neko",
        method: "json",
        path: "results[0].url" // Ruta anidada en JSON
      }
    ];

    let lastError;
    
    for (const api of imageAPIs) {
      try {
        // Reacción de verificación
        await react(m, REACTIONS.checking);
        
        const apiResponse = await fetchWithTimeout(api.url, 8000);
        if (!apiResponse.ok) continue;

        let imageUrl;
        
        // Procesamiento según el tipo de API
        if (api.method === "direct") {
          imageUrl = api.url;
        } else if (api.method === "json") {
          const data = await apiResponse.json();
          imageUrl = api.path 
            ? api.path.split('.').reduce((o, i) => o[i], data)
            : data.url;
        }

        // Validación de URL
        if (!isValidImageUrl(imageUrl)) continue;

        // Reacción de descarga
        await react(m, REACTIONS.downloading);
        
        // Envío de imagen
        await conn.sendFile(
          m.chat, 
          imageUrl, 
          'anime_girl.jpg', 
          ` Aquí tienes ${userId.split('@')[0]}\n` +
          `👉 Reacciona con ${REACTIONS.success} si te gustó`,
          m
        );

        // Reacción de éxito
        await react(m, REACTIONS.success);
        return;

      } catch (error) {
        lastError = error;
        continue;
      }
    }

    throw new Error(
      `Todas las APIs fallaron:\n` +
      `• ${lastError?.message || 'Error desconocido'}\n\n` +
      `Prueba estos comandos alternativos:\n` +
      `• ${usedPrefix}waifu\n` +
      `• ${usedPrefix}neko`
    );

  } catch (error) {
    // Manejo final de errores
    await react(m, REACTIONS.error);
    await conn.reply(
      m.chat,
      `⚠️ *Error crítico*\n${error.message}`,
      m
    );
    await react(m, REACTIONS.warning);
  }
};

// Funciones auxiliares
async function react(m, emoji) {
  try {
    await conn.sendMessage(m.chat, {
      react: {
        text: emoji,
        key: m.key
      }
    });
  } catch (e) {
    console.error("Error en reacción:", e);
  }
}

async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  return response;
}

function isValidImageUrl(url) {
  return /^https?:\/\/.+(\.(jpg|jpeg|png|gif|webp))(?:\?.*)?$/i.test(url);
}

// Configuración
handler.help = ['xx'];
handler.tags = ['anime', 'imagen'];
handler.command = 'xx';

export default handler;

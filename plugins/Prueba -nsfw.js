//---Creado por Carlos
//---https://github.com/Kone457

import fetch from 'node-fetch';

const REACTIONS = {
  waiting: '⏳',
  checking: '🔍',
  downloading: '📥',
  success: '✅',
  error: '❌',
  warning: '⚠️'
};

const handler = async (m, { conn, usedPrefix, command }) => {
  await react(m, REACTIONS.waiting);

  try {
    const imageAPIs = [
      {
        name: "Delirius-API",
        url: "https://delirius-apiofc.vercel.app/nsfw/girls",
        method: "direct"
      },
      {
        name: "Waifu-Pics",
        url: "https://api.waifu.pics/sfw/waifu",
        method: "json"
      },
      {
        name: "Nekos-Best",
        url: "https://nekos.best/api/v2/neko",
        method: "json",
        path: "results[0].url"
      }
    ];

    let lastError;

    for (const api of imageAPIs) {
      try {
        await react(m, REACTIONS.checking);

        const apiResponse = await fetchWithTimeout(api.url, 8000);
        if (!apiResponse.ok) continue;

        let imageUrl;

        if (api.method === "direct") {
          imageUrl = api.url;
        } else if (api.method === "json") {
          const data = await apiResponse.json();
          imageUrl = api.path
            ? api.path.split('.').reduce((o, i) => o[i], data)
            : data.url;
        }

        if (!isValidImageUrl(imageUrl)) continue;

        await react(m, REACTIONS.downloading);

        const userMention = `@${m.sender.split('@')[0]}`;
        const message = 
          `╭〔 📦 𝘾𝙤𝙣𝙩𝙚𝙣𝙞𝙙𝙤 𝘾𝙖𝙧𝙜𝙖𝙙𝙤 〕╮\n` +
          `┃ 👤 *${userMention}*, aquí tienes tu imagen:\n` +
          `┃ 👉 Reacciona con ${REACTIONS.success} si te gustó\n` +
          `╰━━━━━━━━━━━━━━━━━━━╯`;

        await conn.sendFile(
          m.chat,
          imageUrl,
          'anime_girl.jpg',
          message,
          m,
          { mentions: [m.sender] }
        );

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
handler.tags = ['nsfw'];
handler.command = 'xx';
handler.register = true;
handler.group = true;

export default handler;
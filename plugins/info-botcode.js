// 🌐 𝗕𝘂𝘀𝗰𝗮𝗱𝗼𝗿 𝗱𝗲 𝗖𝗼́𝗱𝗶𝗴𝗼 𝗱𝗲 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗕𝗼𝘁

import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnail = 'https://qu.ax/phgPU.jpg';

  if (!text) {
    return conn.sendMessage(m.chat, {
      text: '🧃 *Ingresa una palabra clave para buscar código de bots de WhatsApp.*\nEjemplo:\n' + usedPrefix + command + ' index WhatsApp Bot',
      footer: '🔎 GitHub Code Finder por Dorratz',
      contextInfo: {
        externalAdReply: {
          title: 'WhatsApp Bot Code Search',
          body: 'Explora fragmentos de código en segundos',
          thumbnailUrl: thumbnail,
          sourceUrl: 'https://api.dorratz.com'
        }
      }
    }, { quoted: m });
  }

  try {
    let api = `https://api.dorratz.com/v3/github-code?q=${encodeURIComponent(text)}`;
    let response = await fetch(api);
    let json = await response.json();

    if (!json || !json.result || json.result.length === 0) {
      return m.reply('❌ *No se encontraron resultados para:* ' + text);
    }

    let result = json.result[0]; // Puedes hacer un bucle si quieres mostrar más

    let caption = `
🧠 *Archivo:* ${result.file}
📁 *Repositorio:* ${result.repo}
👤 *Autor:* ${result.author}
📜 *Fragmento:* 
\`\`\`
${result.code.slice(0, 300)}...
\`\`\`
🔗 *Link:* ${result.url}
`.trim();

    conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption,
      footer: '🚀 Código obtenido vía Dorratz API',
      contextInfo: {
        externalAdReply: {
          title: result.repo,
          body: `${result.author} • ${result.file}`,
          thumbnailUrl: thumbnail,
          sourceUrl: result.url
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`❌ *Error:* No se pudo obtener el código.\nIntenta con otra palabra clave o revisa la API.`);
    m.react('⚠️');
  }
};

handler.command = ['botcode', 'whatsappcode'];
export default handler;
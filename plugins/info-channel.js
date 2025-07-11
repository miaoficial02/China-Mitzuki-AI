import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const apiURL = `https://delirius-apiofc.vercel.app/tools/whatsappchannelstalk?channel=${encodeURIComponent(text)}`;
  const thumbnailCard = 'https://i.imgur.com/1ZQ3MbY.jpeg'; // Imagen genérica o personalizada

  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `📱 *Ingresa la URL de un canal de WhatsApp para obtener información.*\nEjemplo:\n${usedPrefix + command} https://www.whatsapp.com/channel/0029VaOlQAT9sBIIBBUmZu3Q`,
      footer: '🔍 Plugin Delirius Channel Info',
      contextInfo: {
        externalAdReply: {
          title: 'Explora canales de WhatsApp',
          body: 'Obtén detalles visuales e interactivos',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m });
    return;
  }

  try {
    const res = await fetch(apiURL);
    const json = await res.json();
    const data = json?.data;

    if (!json?.status || !data?.title) {
      return m.reply(`❌ No se pudo obtener información del canal.`);
    }

    const caption = `
📢 *${data.title}*
👥 Seguidores: ${data.followers}
📄 Descripción: ${data.description.slice(0, 200)}...
🔗 [Ir al canal](${data.url})`;

    await conn.sendMessage(m.chat, {
      image: { url: data.profile || thumbnailCard },
      caption,
      footer: '🧩 Información vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: data.title,
          body: `${data.followers} seguidores`,
          thumbnailUrl: data.profile || thumbnailCard,
          sourceUrl: data.url
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error('💥 Error en WhatsApp Channel plugin:', error);
    m.reply(`❌ Ocurrió un error al obtener los datos del canal.\n📛 ${error.message}`);
  }
};

handler.command = ['wainfo', 'whatsappcanal', 'channelinfo'];
export default handler;
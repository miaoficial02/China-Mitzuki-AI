//--- Creado por Carlos
//--- github.com/Kone457

import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const json = await res.json();
    const imageUrl = json[0]?.url;

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: '🌿 *Naturaleza Random*\n\nUna dosis de ternura para alegrar tu día 🐾\n\n.',
      footer: 'Plugin creado por Carlos • github.com/Kone457',
      templateButtons: [
        {
          index: 1,
          quickReplyButton: {
            displayText: '🔁 Ｏ Ｔ Ｒ Ａ Ｍ Á Ｓ',
            id: 'catpic' // sin punto, como comando limpio
          }
        }
      ]
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '❌ No se pudo cargar la imagen. Intenta de nuevo más tarde.', m);
  }
};

handler.command = ['catpic'];
handler.help = ['catpic'];
handler.tags = ['fun'];
handler.group = true;

export default handler;
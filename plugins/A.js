//--- Creado por Carlos
//--- github.com/Kone457

import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const json = await res.json();
    const imageUrl = json[0]?.url;

    const template = {
      image: { url: imageUrl },
      caption: '🌿 *Naturaleza Random*\n\nUna dosis de ternura natural 🐾\nPulsa el botón para ver otra.',
      footer: 'Plugin creado por Carlos • github.com/Kone457',
      templateButtons: [
        {
          index: 1,
          quickReplyButton: {
            displayText: '🔁 Ｏ Ｔ Ｒ Ａ Ｍ Á Ｓ',
            id: '.catpic'
          }
        }
      ]
    };

    await conn.sendMessage(m.chat, template, { quoted: m });
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '❌ Ocurrió un error al obtener la imagen. Intenta nuevamente.', m);
  }
};

handler.command = ['catpic'];
handler.help = ['catpic'];
handler.tags = ['fun'];
handler.group = true;

export default handler;
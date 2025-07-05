//--- Creado por Carlos
//--- github.com/Kone457

import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const json = await res.json();
    const imageUrl = json[0]?.url;

    const message = {
      image: { url: imageUrl },
      caption:
        '🌿 *Naturaleza Random*\n\n' +
        'Una dosis aleatoria de ternura o paisaje natural.\n\n' +
        'Pulsa el botón si quieres ver otra imagen.',
      footer: 'Plugin visual creado por Carlos • github.com/Kone457',
      buttons: [
        {
          buttonId: '.catpic',
          buttonText: { displayText: '🔁 Ｏ Ｔ Ｒ Ａ Ｍ Á Ｓ' },
          type: 1
        }
      ],
      headerType: 4
    };

    await conn.sendMessage(m.chat, message, { quoted: m });
  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, '❌ Error al obtener la imagen. Intenta más tarde.', m);
  }
};

handler.command = ['catpic'];
handler.help = ['catpic'];
handler.tags = ['fun'];
handler.group = true;

export default handler;
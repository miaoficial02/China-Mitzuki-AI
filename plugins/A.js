//--- Creado por Carlos
//--- github.com/Kone457

import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix: _p }) => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const json = await response.json();
  const imageUrl = json[0]?.url;

  const message = {
    image: { url: imageUrl },
    caption:
      '🌿 *Naturaleza Random*\n\n' +
      'Una dosis aleatoria de ternura 🐾.\n' +
      'Pulsa abajo para recibir otra más.',
    footer: 'Plugin creado por Carlos • github.com/Kone457',
    buttons: [
      {
        buttonId: `${_p}catpic`,
        buttonText: { displayText: '🔁 Ｏ Ｔ Ｒ Ａ Ｍ Á Ｓ' },
        type: 1
      }
    ],
    headerType: 4
  };

  await conn.sendMessage(m.chat, message, { quoted: m });
};

handler.command = ['catpic'];
handler.help = ['catpic'];
handler.tags = ['fun'];
handler.group = true;

export default handler;
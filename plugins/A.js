//--- Creado por Carlos
//--- github.com/Kone457

import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const json = await response.json();
  const imageUrl = json[0]?.url;

  const message = {
    image: { url: imageUrl },
    caption:
      '🌿 *Naturaleza Random*\n' +
      'Aquí tienes una dosis de ternura o paisaje aleatorio.\n' +
      '🎴 ¿Quieres otra imagen?\n',
    footer: 'Plugin visual creado por Carlos',
    buttons: [
      { buttonId: '.catpic', buttonText: { displayText: '🔁 Otra imagen' }, type: 1 },
      { buttonId: '.menu', buttonText: { displayText: '📜 Menú' }, type: 1 }
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
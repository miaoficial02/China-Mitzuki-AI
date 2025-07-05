//--- Creado por Carlos
//--- github.com/Kone457

const handler = async (m, { conn, usedPrefix: _p }) => {
  const menuText = `🌟 *Prueba de Botones Visuales*\n\nPulsa alguno para verificar el comportamiento.`;

  const buttons = [
    {
      buttonId: `${_p}owner`,
      buttonText: { displayText: "👑 Ｃ Ｒ Ｅ Ａ Ｄ Ｏ Ｒ" },
      type: 1,
    },
    {
      buttonId: `${_p}code`,
      buttonText: { displayText: "🕹 Ｓ Ｅ Ｒ Ｂ Ｏ Ｔ" },
      type: 1,
    },
    {
      buttonId: `${_p}grupos`,
      buttonText: { displayText: "🌪 Ｇ Ｒ Ｕ Ｐ Ｏ Ｓ" },
      type: 1,
    },
  ];

  await conn.sendMessage(
    m.chat,
    {
      image: { url: 'https://qu.ax/JznsE.jpg' },
      caption: menuText,
      footer: "Bot Visual de Carlos",
      buttons,
      headerType: 4
    },
    { quoted: m }
  );
};

handler.command = ['&&'];
handler.help = ['pruebabtn'];
handler.tags = ['test'];
handler.group = true;

export default handler;
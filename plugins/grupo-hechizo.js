const handler = async (m, { conn }) => {
  const chat = m.chat;

  const hechizo = [
    '🪄 *Shizuka susurra entre planos...*',
    '✨ Que comience la magia...',
    '🌙 El aire se electrifica...',
    '🔥 El ritmo toma forma...',
    '🧿 Abriendo un portal sonoro...',
    '💥 Preparando impacto dimensional...',
    '⚡ Reuniendo energía de frecuencias olvidadas...',
    '🔮 Un kick desde el abismo está por nacer...',
    '🥁 ...KICK INFERNAL ACTIVADO...',
    '💣 *BOOM* 💥',
    '💥 *BOOM* 💥',
    '🔥 *BOOM BOOM* 💥💥',
    '🧨 El hechizo ha sido desatado...',
    '🌌 Disipando vibraciones residual...',
    '💤 Silencio... como si nada hubiera pasado.'
  ];

  const enviados = [];

  for (let i = 0; i < hechizo.length; i++) {
    await new Promise(r => setTimeout(r, 600 + i * 100));
    const msg = await conn.sendMessage(chat, { text: hechizo[i] }, { quoted: m });
    enviados.push(msg.key);
  }

  // 💨 Limpia los mensajes después de 12s
  setTimeout(async () => {
    for (const key of enviados) {
      try {
        await conn.sendMessage(chat, { delete: key });
      } catch (e) {
        console.warn("⛔ No pude borrar un mensaje mágico:", e.message);
      }
    }
  }, 12000);
};

handler.command = /^hechizo$/i;
handler.tags = ['diversión'];
handler.help = ['hechizo'];
export default handler;
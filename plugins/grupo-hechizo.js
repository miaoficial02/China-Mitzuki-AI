const handler = async (m, { conn, mentionedJid, isGroup, isAdmin, isBotAdmin }) => {
  // 🛡️ Protección mágica
  if (!isGroup && !m.chat.endsWith('@g.us')) return conn.reply(m.chat, '👥 *Este hechizo solo se puede usar en grupos.*', m);
  if (!isAdmin) return conn.reply(m.chat, '🧙‍♂️ *Solo los administradores pueden invocar este hechizo.*', m);
  if (!isBotAdmin) return conn.reply(m.chat, '⚠️ *Necesito ser administrador para desterrar a alguien.*', m);

  const target = mentionedJid?.[0];
  if (!target) return conn.reply(m.chat, '📌 *Menciona a alguien para invocar el hechizo.*\nEjemplo: `.hechizo @usuario`', m);
  if (target === conn.user.jid) return conn.reply(m.chat, '😏 *No puedes hechizar a quien canaliza la energía...*', m);
  if (target === m.sender) return conn.reply(m.chat, '🪞 *¿Hechizarte a ti mismo? Oscura tentación... pero no.*', m);

  const secuencia = [
    '🪄 *Shizuka susurra entre planos ocultos...*',
    '📜 Desplegando el grimorio astral...',
    '🌫️ El viento se enrosca como si supiera...',
    '🔮 La energía comienza a girar en espiral...',
    '⛓️ Sellos flotan sobre @user...',
    '🧿 Coordenadas cósmicas alineadas...',
    '⚡ Canalizando flujo etéreo a través del bastón...',
    '🔺 Convergencia de planos completa.',
    '💢 Invocando sentencia final: ¡exilio dimensional!',
    '💣 *¡BOOM!* 💥 El vínculo ha sido cortado...',
    '🌪️ Entidad desterrada más allá del velo...',
    '🫥 *Aquí no ha pasado nada...*'
  ];

  for (let i = 0; i < secuencia.length; i++) {
    const mensaje = secuencia[i].replace('@user', '@' + target.split('@')[0]);
    await conn.sendMessage(m.chat, { text: mensaje, mentions: [target] }, { quoted: m });
    await new Promise(r => setTimeout(r, 650 + i * 100));
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
  } catch (e) {
    await conn.reply(m.chat, '🚫 *No pude completar el exilio mágico. Quizás ya no está, o mis poderes fueron bloqueados.*', m);
  }
};

handler.command = /^hechizo$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.tags = ['diversión', 'grupo'];
handler.help = ['hechizo @usuario'];

export default handler;
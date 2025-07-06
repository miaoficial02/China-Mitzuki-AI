const handler = async (m, { conn, mentionedJid, isGroup, isAdmin, isBotAdmin }) => {
  if (!isGroup) return conn.reply(m.chat, '👥 *Este hechizo solo se puede usar en grupos.*', m);
  if (!isAdmin) return conn.reply(m.chat, '🧙‍♂️ *Solo los administradores pueden invocar este hechizo.*', m);
  if (!isBotAdmin) return conn.reply(m.chat, '⚠️ *Necesito ser admin para desterrar a alguien.*', m);

  const target = mentionedJid?.[0];
  if (!target) return conn.reply(m.chat, '📌 *Debes mencionar a alguien para lanzar el hechizo.*\nEj: `.hechizo @usuario`', m);
  if (target === conn.user.jid) return conn.reply(m.chat, '😏 *¿Hechizarme a mí? Te falta nivel.*', m);
  if (target === m.sender) return conn.reply(m.chat, '🫠 *¿Quieres autohechizarte? Eso es oscura magia...*', m);

  const secuencia = [
    '🪄 *Shizuka susurra entre planos...*',
    '📜 Activando runas ancestrales...',
    '🌫️ La atmósfera se carga de tensión...',
    '🔮 Energía caótica desbordándose...',
    '🧿 Coordenadas astrales sincronizadas...',
    '⚡ Canalizando flujo etéreo...',
    '🚪 Portal de exilio estabilizado...',
    '💢 Sellando destino de @user...',
    '💣 *EXPULSIÓN EJECUTADA* 💥',
    '🌪️ El polvo mágico se disipa...',
    '🫥 *Aquí no ha pasado nada...*'
  ];

  for (let i = 0; i < secuencia.length; i++) {
    const frase = secuencia[i].replace('@user', '@' + target.split('@')[0]);
    await conn.sendMessage(m.chat, { text: frase, mentions: [target] }, { quoted: m });
    await new Promise(r => setTimeout(r, 650 + i * 100));
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove');
  } catch {
    await conn.reply(m.chat, '🚫 *No se pudo completar el hechizo. El usuario podría haberse ido o el poder fue insuficiente.*', m);
  }
};

handler.command = /^hechizo$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.tags = ['diversión', 'grupo'];
handler.help = ['hechizo @usuario'];

export default handler;
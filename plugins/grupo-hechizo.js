const handler = async (m, { conn, text, isGroup, isAdmin, isBotAdmin }) => {
  if (!isGroup && !m.chat.endsWith('@g.us'))
    return conn.reply(m.chat, '👥 *Este hechizo solo se puede usar en grupos.*', m);
  if (!isAdmin)
    return conn.reply(m.chat, '🧙‍♂️ *Solo los administradores pueden invocar este hechizo.*', m);
  if (!isBotAdmin)
    return conn.reply(m.chat, '⚠️ *Necesito ser admin para desterrar a alguien.*', m);

  const userId = m.mentionedJid?.[0] ||
                 (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);

  if (!userId)
    return conn.reply(m.chat, '📌 *Menciona a alguien o escribe su número para lanzar el hechizo.*\nEjemplo: `.hechizo @usuario` o `.hechizo 52123456789`', m);

  if (userId === conn.user.jid)
    return conn.reply(m.chat, '😏 *¿Hechizarme a mí? Te falta nivel.*', m);
  if (userId === m.sender)
    return conn.reply(m.chat, '🫣 *¿Hechizarte a ti mismo? Oscura tentación... pero no.*', m);

  const pasos = [
    '🪄 *Shizuka susurra entre planos...*',
    '📜 Desplegando grimorio etéreo...',
    '🌫️ La atmósfera vibra con energía contenida...',
    '🔮 El sello ancestral comienza a formarse...',
    '⛓️ Coordenadas astrales fijadas...',
    '🧿 Destino de @user entrelazado...',
    '⚡ Canalizando poder desde la aurora digital...',
    '💣 *¡DESTIERRO INMINENTE!*',
    '🌪️ La esencia se disuelve en el viento...',
    '🫥 *Aquí no ha pasado nada...*'
  ];

  for (let i = 0; i < pasos.length; i++) {
    const txt = pasos[i].replace('@user', '@' + userId.split('@')[0]);
    await conn.sendMessage(m.chat, { text: txt, mentions: [userId] }, { quoted: m });
    await new Promise(r => setTimeout(r, 700 + i * 80));
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
  } catch {
    await conn.reply(m.chat, '🚫 *El hechizo falló. Puede que el objetivo ya no esté, o que mis poderes estén limitados.*', m);
  }
};

handler.command = /^hechizo$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.tags = ['diversión', 'grupo'];
handler.help = ['hechizo @usuario | número'];

export default handler;
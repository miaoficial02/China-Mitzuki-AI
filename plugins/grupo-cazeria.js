const handler = async (m, { conn, participants, isAdmin, isBotAdmin }) => {
  const texto = (m.text || '').toLowerCase().trim();

  if (texto !== 'comience la cacería') return;

  if (!m.isGroup) return conn.reply(m.chat, '👥 *Este comando solo funciona en grupos.*', m);
  if (!isAdmin) return conn.reply(m.chat, '🧙‍♂️ *Solo un alfa puede iniciar la cacería.*', m);
  if (!isBotAdmin) return conn.reply(m.chat, '⚠️ *Necesito ser administrador para dar el zarpazo final.*', m);

  const botNumber = conn.user.jid;
  const objetivo = participants.filter(p => !p.admin && p.id !== botNumber);

  await conn.sendMessage(m.chat, { text: '🐺 *Shizuka levanta el hocico al viento...*' }, { quoted: m });
  await new Promise(r => setTimeout(r, 800));
  await conn.sendMessage(m.chat, { text: '🔥 *¡Comienza la cacería!*' }, { quoted: m });

  for (const user of objetivo) {
    const nombre = '@' + user.id.split('@')[0];
    const narracion = [
      `👣 Rastro detectado de ${nombre}...`,
      `🌫️ Afilando colmillos...`,
      `💥 Ataque sincronizado.`,
      `🩸 ¡Cae ${nombre}!`
    ];

    for (const texto of narracion) {
      await conn.sendMessage(m.chat, { text: texto, mentions: [user.id] }, { quoted: m });
      await new Promise(r => setTimeout(r, 400));
    }

    try {
      await conn.groupParticipantsUpdate(m.chat, [user.id], 'remove');
      await new Promise(r => setTimeout(r, 600));
    } catch {
      await conn.sendMessage(m.chat, { text: `⚠️ *${nombre} logró escapar... por ahora.*` }, { quoted: m });
    }
  }

  await conn.sendMessage(m.chat, { text: '🌕 *La jauría descansa. El territorio ha sido purgado.*' }, { quoted: m });
};

handler.customPrefix = /^comience\s+la\s+cacer[ií]a$/i;
handler.command = new RegExp(); // Sin prefijo
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.tags = ['grupo'];
handler.help = ['comience la cacería'];

export default handler;
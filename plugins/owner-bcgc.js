const handler = async (m, { conn, isROwner, text }) => {
  const delay = (time) => new Promise((res) => setTimeout(res, time));
  const getGroups = await conn.groupFetchAllParticipating();
  const groups = Object.values(getGroups).map(group => group.id);
  
  if (!text) throw '⚠️ Te faltó el mensaje a enviar.';

  for (const id of groups) {
    await delay(500);
    conn.sendMessage(id, { text: text }).catch(err => console.error(`Error enviando mensaje al grupo ${id}:`, err));
  }
  
  m.reply(`✅ *Mensaje enviado a:* ${groups.length} *grupo(s)*`);
};

handler.help = ['broadcastgroup', 'bcgc'];
handler.tags = ['owner'];
handler.command = ['bc'];
handler.owner = true;

export default handler;

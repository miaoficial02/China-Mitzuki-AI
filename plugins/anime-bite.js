import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender);

  let name = await conn.getName(who);
  let name2 = await conn.getName(m.sender);

  let str =
    who === m.sender
      ? `╭─〔 😖 𝘼𝙪𝙩𝙤-𝙈𝙤𝙧𝙙𝙞𝙙𝙖 〕─╮\n` +
        `┃ ${name2} se mordió a sí mism@ ≽^•⩊•^≼\n` +
        `╰────────────────────╯`
      : `╭──〔 🐾 𝙈𝙤𝙧𝙙𝙞𝙙𝙖 𝙇𝙞𝙣𝙙𝙖 〕──╮\n` +
        `┃ ${name2} mordió a ${name || '@' + who.split('@')[0]} ≽^•⩊•^≼\n` +
        `╰────────────────────╯`;

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789640809.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789647443.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789653530.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789660235.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789666686.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789604757.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789611045.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789617091.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789623357.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789629746.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789592139.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742789597656.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595529576.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595524733.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595520348.mp4'
    ];

    const video = videos[Math.floor(Math.random() * videos.length)];

    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        gifPlayback: true,
        caption: str,
        mentions: [who]
      },
      { quoted: m }
    );
  }
};

handler.help = ['bite'];
handler.tags = ['anime'];
handler.command = ['bite', 'morder'];
handler.group = true;

export default handler;
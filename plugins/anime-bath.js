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
      ? `╭──〔 🧼 𝘽𝙖𝙣̃𝙤 𝙍𝙚𝙡𝙖𝙟𝙖𝙣𝙩𝙚 〕──╮\n` +
        `┃ ${name2} se está dando un buen baño` +
        `╰─────────────────────╯`
      : `╭──〔 🛁 𝘽𝙖𝙣̃𝙤 𝘼𝙡𝙚𝙜𝙧𝙚 〕──╮\n` +
        `┃ ${name2} está bañando a ${name || '@' + who.split('@')[0]} 🧴🫧\n` +
        `╰────────────────────╯`;

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788344166.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788334922.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788381433.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788373764.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788367604.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788360468.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788351832.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788411685.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788405466.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788400374.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788391016.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742788385627.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595152236.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595159911.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595155336.mp4'
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

handler.help = ['bath'];
handler.tags = ['anime'];
handler.command = ['bath', 'bañarse'];
handler.group = true;

export default handler;
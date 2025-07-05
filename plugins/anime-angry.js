/*
❀ Código creado por Destroy
✧ https://github.com/The-King-Destroy/Yuki_Suou-Bot.git
*/

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid.length > 0 
    ? m.mentionedJid[0] 
    : (m.quoted ? m.quoted.sender : m.sender);

  let name = await conn.getName(who);
  let name2 = await conn.getName(m.sender);

  let str =
    who === m.sender
      ? `╭───〔 😤 𝘼𝙪𝙩𝙤-𝙀𝙣𝙤𝙟𝙤 〕───╮\n` +
        `┃ ${name2} está frustrado/a consigo mism@ 😓\n` +
        `╰─────────────────────╯`
      : `╭──〔 🔥 𝙀𝙣𝙛𝙧𝙚𝙣𝙩𝙖𝙢𝙞𝙚𝙣𝙩𝙤 〕──╮\n` +
        `┃ ${name2} está enojado/a con ${name || '@' + who.split('@')[0]} \n` +
        `╰────────────────────╯`;

  if (m.isGroup) {
    // Lista de videos aleatorios
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786883573.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786889338.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786895614.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786900963.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786913602.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786877462.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786829620.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786871042.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786865577.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786855746.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786847500.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742786834604.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594831851.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594842569.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745594838212.mp4'
    ];

    const video = videos[Math.floor(Math.random() * videos.length)];

    // Envío del video con mención
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

handler.help = ['angry'];
handler.tags = ['anime'];
handler.command = ['angry', 'enojado'];
handler.group = true;

export default handler;
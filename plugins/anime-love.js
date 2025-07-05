/*───────────────────────────────────────
  📁 Módulo:     love.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender);

  let name = await conn.getName(who);
  let name2 = await conn.getName(m.sender);

  let str =
    m.mentionedJid.length > 0 || m.quoted
      ? `╭──〔 💘 DECLARACIÓN DE AMOR 〕──╮\n` +
        `┃ ${name2} está enamorad@ de ${name}\n` +
        `╰────────────────────────────────╯`
      : `╭──〔 💖 ENAMORAMIENTO SOLITARIO 〕──╮\n` +
        `┃ ${name2} está enamorad@\n` +
        `╰────────────────────────────────╯`;

  if (m.isGroup) {
    const videos = [
      'https://telegra.ph/file/5fbd60c40ab190ecc8e1c.mp4', 
      'https://telegra.ph/file/ca30d358d292674698b40.mp4', 
      'https://telegra.ph/file/25f88386dd7d4d6df36fa.mp4',
      'https://telegra.ph/file/eb63131df0de6b47c7ab7.mp4',
      'https://telegra.ph/file/209990ee46c645506a5fc.mp4',
      'https://telegra.ph/file/440f276fcbb2d04cbf1d1.mp4',
      'https://telegra.ph/file/42cea67d9b013ed9a9cd0.mp4',
      'https://telegra.ph/file/bc0f47b8f3fb9470bc918.mp4',
      'https://telegra.ph/file/79ae875090b64ab247b7a.mp4'
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
}

handler.help = ['love @tag', 'amor @usuario', 'enamorada'];
handler.tags = ['anime'];
handler.command = ['love', 'amor', 'enamorada'];
handler.group = true;

export default handler;
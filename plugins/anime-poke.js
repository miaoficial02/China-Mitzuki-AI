/*───────────────────────────────────────
  📁 Módulo:     poke.js
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
    who === m.sender
      ? `╭──〔 🫳 AUTO-TOQUE SOSPECHOSO 〕──╮\n` +
        `┃ ${name2} se picó a sí mism@\n` +
        `╰───────────────────────────────╯`
      : `╭──〔 👉 ATAQUE JUGUETÓN 〕──╮\n` +
        `┃ ${name2} picó a ${name}\n` +
        `╰────────────────────────────╯`;

  if (m.isGroup) {
    const videos = [
      'https://qu.ax/dzdVR.mp4',
      'https://qu.ax/AXLDz.mp4',
      'https://qu.ax/AJEfp.mp4',
      'https://qu.ax/LEYfb.mp4',
      'https://qu.ax/WNGYF.mp4',
      'https://qu.ax/WFWaY.mp4',
      'https://qu.ax/ditle.mp4',
      'https://qu.ax/dzdVR.mp4'
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

handler.help = ['poke @tag', 'picar @usuario'];
handler.tags = ['anime'];
handler.command = ['poke', 'picar'];
handler.group = true;

export default handler;
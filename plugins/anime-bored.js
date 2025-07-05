

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender)

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  let str =
    who === m.sender
      ? `╭─〔 😑 𝘼𝙗𝙪𝙧𝙧𝙞𝙢𝙞𝙚𝙣𝙩𝙤 𝙀𝙭𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖𝙡 〕─╮\n` +
        `┃ ${name2} está aburrido/a de sí mism@ ( ¬_¬)\n` +
        `╰────────────────────────────╯`
      : `╭─〔 💤 𝘼𝙗𝙪𝙧𝙧𝙞𝙙𝙤/𝙖 〕─╮\n` +
        `┃ ${name2} está aburrido/a de ${name} (¬_¬)\n` +
        `╰────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851819507.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851814706.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851844356.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851840200.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851836453.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851832068.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851827170.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851867449.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851862049.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851858234.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851854589.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742851850221.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745597527808.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745597523276.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745597518227.mp4'
    ]

    const video = videos[Math.floor(Math.random() * videos.length)]

    await conn.sendMessage(
      m.chat,
      {
        video: { url: video },
        gifPlayback: true,
        caption: str,
        mentions: [who]
      },
      { quoted: m }
    )
  }
}

handler.help = ['bored']
handler.tags = ['anime']
handler.command = ['bored', 'aburrido']
handler.group = true

export default handler
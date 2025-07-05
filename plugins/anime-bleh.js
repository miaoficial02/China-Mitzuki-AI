
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
      ? `╭───〔 👅 𝘼𝙪𝙩𝙤-𝙇𝙚𝙣𝙜𝙪𝙖 〕───╮\n` +
        `┃ ${name2} se sacó la lengua a sí mism@ 🙃\n` +
        `╰─────────────────────╯`
      : `╭──〔 😝 𝙇𝙚𝙣𝙜𝙪𝙖 𝙁𝙖𝙘𝙚 〕──╮\n` +
        `┃ ${name2} le sacó la lengua a ${name} 👅\n` +
        `╰──────────────────────╯`

  if (m.isGroup) {
    const videos = [
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790736580.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790732658.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790771185.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790767541.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790764155.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790752990.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790742850.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790794852.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790790619.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790785503.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790781953.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1742790775403.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595800133.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595794273.mp4',
      'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745595797089.mp4'
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

handler.help = ['bleh']
handler.tags = ['anime']
handler.command = ['bleh', 'lengua']
handler.group = true

export default handler
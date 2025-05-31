let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `
✰ *Dueño* https://Wa.me/5355699866
✦ *Bot:* ${botname}
⚘ *Versión:* ${vs}
❖ *Libreria:* ${libreria} ${baileys}

❍ *Creador:*

 ☬ 𝘾𝙖𝙧𝙡𝙤𝙨 ☬
> 🜸 Rol » *Creador*
> ✧ GitHub » https://github.com/Kone457

`
await conn.sendFile(m.chat, img, '', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler

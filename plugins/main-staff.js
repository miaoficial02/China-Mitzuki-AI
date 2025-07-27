let handler = async (m, { conn, command, usedPrefix }) => {
let img = 'https://files.catbox.moe/hf662e.jpg'
let staff = `
❐ *Dueño* https://Wa.me/18493907272
✦ *Bot:* ${botname}
❐ *Versión:* ${vs}
❐ *Libreria:* ${libreria} ${baileys}

✎ *Creador:*

 𝑬𝒓𝒆𝒏𝒙𝒛𝒚 𝑿𝒛𝒚
> ✎ Rol » *Creador*
> ❐ GitHub » https://github.com/erenxzy

`
await conn.sendFile(m.chat, img, '', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler

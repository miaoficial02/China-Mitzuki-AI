import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.mentionedJid.length > 0 ? m.mentionedJid[0] : (m.quoted ? m.quoted.sender : m.sender)
    let name = conn.getName(who)
    let name2 = conn.getName(m.sender)

    let str = m.mentionedJid.length > 0 || m.quoted 
        ? `\`${name2}\` está celebrando con \`${name || who}\` 🎉🥳` 
        : `\`${name2}\` está celebrando 🎉🥳`
    
    if (m.isGroup) {
        let pp1 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/celebration1.mp4'
        let pp2 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/celebration2.mp4'
        let pp3 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/celebration3.mp4'
        let pp4 = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/celebration4.mp4'

        const videos = [pp1, pp2, pp3, pp4]
        const video = videos[Math.floor(Math.random() * videos.length)]
        
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, ptt: true, mentions: [who] }, { quoted: m })
    }
}

handler.help = ['celebrate']
handler.tags = ['fun']
handler.command = ['celebrate', 'fiesta']
handler.group = true

export default handler

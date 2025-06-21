//---Creado por Carlos
//---https://github.com/Kone457

import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `${emoji} Ingrese una petición para que deepseek lo responda.`, m)
try {
await m.react(rwait)
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://api.dorratz.com/ai/deepseek?prompt=${text}`)
var res = await apii.json()
await m.reply(res.result)
} catch {
await m.react('💔')
await conn.reply(m.chat, `${msm} Deepseek no puede responder a esa pregunta.`, m)
}}
handler.command = ['deepseek']
handler.help = ['deepseek']
handler.tags = ['ai']
handler.group = true;
handler.register = true;

export default handler

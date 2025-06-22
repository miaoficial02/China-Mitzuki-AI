//---Creado por Carlos
//---https://github.com/Kone457
import fetch from 'node-fetch'
var handler = async (m, { text,  usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `${emoji} Por favor ,haga su pregunta para poder responder.`, m)
try {
await m.react(rwait)
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://api.vreden.my.id/api/simi?queryt=${text}`)
var res = await apii.json()
await m.reply(res.result)
} catch {
await m.react('❌')
await conn.reply(m.chat, `${msm} Lo siento pero no puedo responder esa pregunta.`, m)
}}
handler.command = ['simi']
handler.help = ['simi']
handler.tags = ['ai']
handler.group = true

export default handler

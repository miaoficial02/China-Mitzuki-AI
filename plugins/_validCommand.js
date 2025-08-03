export async function before(m) {
if (!m.text || !global.prefix.test(m.text)) {
return
}
const usedPrefix = global.prefix.exec(m.text)[0]
const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
const validCommand = (command, plugins) => {
for (let plugin of Object.values(plugins)) {
if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
return true
}}
return false
}
if (!command) return
if (command === "bot") {
return
}
if (validCommand(command, global.plugins)) {
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]    
if (chat.isBanned) {
const avisoDesactivado = `《✦》El bot *${botname}* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`
await m.reply(avisoDesactivado)
return
}    
if (!user.commands) {
user.commands = 0
}
user.commands += 1
} else {
const comando = m.text.trim().split(' ')[0]
// Mensajes aleatorios para comandos inexistentes

//const frasesError = [
//`╭━━━〔 🌨️ RUKIA-BOT 〕━━━╮
┃ 《✦》El comando *${comando}* no se encuentra disponible.
┃ Consulta la lista de comandos con:
┃ ➪ *.help*
╰━━━━━━━━━━━━━━━━━━━━╯`,

  `╭━━━〔 🌨️ RUKIA-BOT 〕━━━╮
┃ 《✦》Ups... El comando *${comando}* no existe.
┃ Revisa los comandos disponibles con:
┃ ➪ *.help*
╰━━━━━━━━━━━━━━━━━━━━╯`,

  `╭━━━〔 🌨️ RUKIA-BOT 〕━━━╮
┃ 《✦》El comando *${comando}* no está registrado en RUKIA-BOT.
┃ Usa el menú de ayuda con:
┃ ➪ *.help*
╰━━━━━━━━━━━━━━━━━━━━╯`,

  `╭━━━〔 🌨️ RUKIA-BOT 〕━━━╮
┃ 《✦》No encontré el comando *${comando}*.
┃ Mira la lista completa con:
┃ ➪ *.help*
╰━━━━━━━━━━━━━━━━━━━━╯`,

  `╭━━━〔 🌨️ RUKIA-BOT 〕━━━╮
┃ 《✦》El comando *${comando}* parece no estar disponible.
┃ Accede al menú con:
┃ ➪ *.help*
╰━━━━━━━━━━━━━━━━━━━━╯`
]

// Responder con una frase aleatoria
let respuesta = frasesError[Math.floor(Math.random() * frasesError.length)]
await m.reply(respuesta)
}}
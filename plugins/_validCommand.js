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
// 📌 Lista de todos los comandos válidos de RUKIA-BOT
const comandosValidos = [
  "menu","uptime","status","ping","speed","sc","staff","creador","links","infobot",
  "reg","unreg","profile","myns",
  "play","play2","ytmp3","ytmp4","tiktok","instagram","facebook","twitter","spotify","mediafire","mega","terabox","apk","pinvid","gitclone",
  "google","imagen","pinterest","yts","npmjs","github","infoanime",
  "tomp3","tovideo","tourl","tts","togif",
  "ia","gemini","dalle","flux","simi","Rukia","Iaxzy",
  "waifu","hug","kiss","pat","slap","angry","happy","sad","cry","dance","sleep",
  "rw","claim","waifus","wimage","winfo","regalar","votar","waifustop",
  "sticker","emojimix","wm","take","setmeta","delmeta","qc","img","attp",
  "work","suerte","crime","ruleta","casino","slot","cartera","bank","depositar","retirar","transfer","minar","buy","daily","cofre","semanal","mensual","robar","robarxp","baltop","aventura","curar","cazar","inventario","mazmorra","halloween","navidad",
  "calcular","clima","horario","fake","hd","letra","ver","shazam","ss","tamaño","say","todoc","traducir",
  "marry","divorce","setgenero","delgenero","setbirth","delbirth","setdesc","deldesc","lb","level","premium","confesar",
  "tag","gp","linea","setwelcome","setbye","link","admin","revoke","group open","group close","kick","add","promote","demote","gpbanner","gpname","gpdesc","warn","unwarn","advlist","bot on","bot off","mute","unmute","poll","delete","fantasmas","kickfantasmas","invocar","setemoji","kicknum"
]

// 📌 Función de similitud con distancia de Levenshtein
function similitud(a, b) {
  const matrix = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // reemplazo
          matrix[i][j - 1] + 1,     // inserción
          matrix[i - 1][j] + 1      // eliminación
        )
      }
    }
  }

  const distancia = matrix[b.length][a.length]
  const maxLen = Math.max(a.length, b.length)
  return ((maxLen - distancia) / maxLen) * 100 // Porcentaje
}

// 📌 Buscar el comando más parecido
let mejorCoincidencia = { comando: null, porcentaje: 0 }
for (let c of comandosValidos) {
  let porcentaje = similitud(comando.toLowerCase(), c.toLowerCase())
  if (porcentaje > mejorCoincidencia.porcentaje) {
    mejorCoincidencia = { comando: c, porcentaje }
  }
}

// 📌 Mensajes de error con decoración y emojis
let mensaje = `╭━━━〔 🌨️❄️ RUKIA-BOT ❄️🌨️ 〕━━━╮
┃ 《✦》El comando *${comando}* no existe.
┃ ➪ Usa *.help* para ver la lista completa.
`

if (mejorCoincidencia.porcentaje > 60) {
  mensaje += `┃ ❄️ Quizás quisiste decir: *${mejorCoincidencia.comando}* (${mejorCoincidencia.porcentaje.toFixed(0)}%)\n`
}

mensaje += "╰━━━━━━━━━━━━━━━━━━━━╯"

await m.reply(mensaje)
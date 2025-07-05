let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    
    let txt = `
🌟 *¡Hola @${userId.split('@')[0]}!* 🌟
Soy *${botname}*, tu asistente virtual.

📊 *Estadísticas:*
🕒 Tiempo activo: ${uptime}
👥 Usuarios registrados: ${totalreg}
📚 Comandos disponibles: ${totalCommands}

╭━━━〔 *Info-Bot* 〕
┃ ❏ #menu • muestra la lista de 
┃ comandos.
┃ ❏ #uptime • Ver tiempo activo del
┃ Bot.
┃ ❏ #sc • Link del repositorio oficial
┃ ❏ #staff • Ver la lista de 
┃ desarrolladores
┃ ❏ #creador • Contacto del
┃ creador.
┃ ❏ #status • Ver el estado actual 
┃ de la Bot.
┃ ❏ #links • Enlaces oficiales 
┃ de la bot.
┃ ❏ #infobot • Ver la informacion
┃ de la bot.
┃ ❏ #ping • Muestra la velocidad 
┃ de la Bot.
┃ ❏ #speed • Ver las estadísticas
┃ de velocidad.
╰━━━━━━━━━━⬣

╭━━━〔 *Registro* 〕
┃ ❏ #reg • Registrarte en la bot.
┃ ❏ #unreg • Borrar tu registro.
┃ ❏ #profile • Ver tu perfil.
┃ ❏ #myns • Ver tu número de serie.
╰━━━━━━━━━━⬣

╭━━━〔 *Descargas* 〕
┃ ❏ #play • Descargar música de 
┃ YouTube.
┃ ❏ #ytmp3 • Descargar audio de 
┃ YouTube.
┃ ❏ #ytmp4 • Descargar video de 
┃ YouTube.
┃ ❏ #tiktok • Descargar video de 
┃ TikTok.
┃ ❏ #instagram • Descargar de 
┃ Instagram.
┃ ❏ #facebook • Descargar de 
┃ Facebook.
┃ ❏ #twitter • Descargar de Twitter.
┃ ❏ #spotify • Descargar de Spotify.
┃ ❏ #mediafire • Descargar de 
┃ MediaFire.
┃ ❏ #mega • Descargar de Mega.
╰━━━━━━━━━━⬣

╭━━━〔 *Buscadores* 〕
┃ ❏ #google • Buscar en Google.
┃ ❏ #imagen • Buscar imágenes.
┃ ❏ #pinterest • Buscar en Pinterest.
┃ ❏ #yts • Buscar videos en YouTube.
┃ ❏ #npmjs • Buscar paquetes NPM.
┃ ❏ #github • Buscar repositorios.
┃ ❏ #infoanime • Información de anime.
╰━━━━━━━━━━⬣

╭━━━〔 *Convertidores* 〕
┃ ❏ #tomp3 • Convertir a MP3.
┃ ❏ #tovideo • Convertir a video.
┃ ❏ #tourl • Convertir a enlace.
┃ ❏ #tts • Texto a voz.
┃ ❏ #togif • Convertir a GIF.
╰━━━━━━━━━━⬣

╭━━━〔 *Inteligencia Artificial* 〕
┃ ❏ #ia • Chat con IA.
┃ ❏ #gemini • Chat con Gemini.
┃ ❏ #dalle • Generar imágenes IA.
┃ ❏ #flux • Generar imágenes Flux.
┃ ❏ #simi • Chat con SimSimi.
╰━━━━━━━━━━⬣

╭━━━〔 *Anime* 〕
┃ ❏ #waifu • Imágenes de waifus.
┃ ❏ #hug • Dar un abrazo.
┃ ❏ #kiss • Dar un beso.
┃ ❏ #pat • Acariciar.
┃ ❏ #slap • Dar una bofetada.
┃ ❏ #angry • Mostrar enojo.
┃ ❏ #happy • Mostrar felicidad.
┃ ❏ #sad • Mostrar tristeza.
┃ ❏ #love • Mostrar amor.
┃ ❏ #cry • Llorar.
┃ ❏ #dance • Bailar.
┃ ❏ #sleep • Dormir.
╰━━━━━━━━━━⬣

╭━━━〔 *Stickers* 〕
┃ ❏ #sticker • Crear sticker.
┃ ❏ #emojimix • Mezclar emojis.
┃ ❏ #wm • Agregar marca de agua.
┃ ❏ #take • Cambiar nombre de sticker.
╰━━━━━━━━━━⬣locidad.
┃ ❏ #usuarios • Muestra los 
┃ usuarios 
┃ ❏ #ds • Eliminar archivos de 
┃ sesiones.
╰━━━━━━━━━━⬣

╭━━━〔 *Buscadores*〕
┃ ❏ #tiktoksearch • Buscar videos
┃ en tiktok.
┃ ❏ #tweetposts • Buscador de post  
┃ de Twitter.
┃ ❏ #ytsearch • Realiza búsquedas 
┃ de Youtube.
┃ ❏ #githubsearch • Buscador de 
┃ GitHub
┃ ❏ #cuevana • Buscador de 
┃ películas/series.
┃ ❏ #google • Realiza búsquedas 
┃ en Google
┃ ❏ #pin • Buscador de imagenes
┃ de Pinterest
┃ ❏ #imagen • Busca imagenes 
┃ en google
┃ ❏ #infoanim • Busca información 
┃ de anime
┃ ❏ #hentaisearch • Busca capítulos 
┃ hentai
┃ ❏ #xnxxs • Buscador de vídeos 
┃ de Xnxx.
┃ ❏ #xvideossearch • Busca vídeos
┃ en Xvideos.
┃ ❏ #pornhubsearch • Busca videos
┃ en Pornhub.
┃ ❏ #npmjs • Buscandor de npmjs.
╰━━━━━━━━━━⬣

╭━━━〔 *Descargas*〕
┃ ❏ #tiktok • Descarga videos 
┃ de TikTok.
┃ ❏ #mediafire • Descarga archivos
┃ de mediafire
┃ ❏ #pinvid • Descargar vídeos 
┃ de Pinterest.
┃ ❏ #mega • Descarga archivos 
┃ de mega
┃ ❏ #play • Descarga audio.
┃ ❏ #play2 • Descargas video.
┃ ❏ #facebook • Descarga videos 
┃ de Facebook.
┃ ❏ #twitter • Descarga videos 
┃ de Twitter
┃ ❏ #instagram • Descargas de 
┃ Instagram
┃ ❏ #terabox • Descarga archivos 
┃ de terabox
┃ ❏ #gitclone • Descargas desde 
┃ github
┃ ❏ #xvideosdl • Descargar videos
┃ desde (Xvideos).
┃ ❏ #xnxxdl Dercargar desde 
┃ (xnxx).
┃ ❏ #apk • Descargar aplicaciones 
┃ de aptoide
╰━━━━━━━━━━⬣

╭━━━〔 *Economia*〕
┃ ❏ #work • Trabaja para ganar 
┃ ${moneda}.
┃ ❏ #slut • Prostituyete y gana
┃ ${moneda}.
┃ ❏ #suerte • Apuesta tus ${moneda}.
┃ ❏ #crime • Has un crimen y gana
┃ ${moneda}.
┃ ❏ #ruleta • Apuesta ${moneda} 
┃ en la ruleta
┃ ❏ #casino • Apuesta ${moneda} 
┃ en el casino
┃ ❏ #slot • Apuesta ${moneda} y 
┃ prueba tu suerte
┃ ❏ #cartera • Ver tus ${moneda}
┃ en la cartera.
┃ ❏ #bank • Ver tus ${moneda}
┃ en el banco.
┃ ❏ #depositar • Deposita ${moneda} 
┃ al banco.
┃ ❏ #retirar • Retira ${moneda} 
┃ del banco.
┃ ❏ #transfer • Transfiere ${moneda}
┃ o XP.
┃ ❏ #minar • Trabaja como minero.
┃ ❏ #buy • Compra ${moneda} con tu XP.
┃ ❏ #daily • Reclama tu 
┃ recompensa diaria.
┃ ❏ #cofre • Reclama un cofre 
┃ diario.
┃ ❏ #semanal • Reclama tu regalo
┃ semanal.
┃ ❏ #mensual • Reclama tu 
┃ recompensa mensual.
┃ ❏ #robar • Intenta robar ${moneda} 
┃ a alguien
┃ ❏ #robarxp • Intenta robar XP 
┃ a un usuario.
┃ ❏ #baltop • Ver el ranking 
┃ de usuarios.
┃ ❏ #aventura • Aventúrate en un
┃ nuevo reino.
┃ ❏ #curar • Cura tu salud.
┃ ❏ #cazar • Caza animales.
┃ ❏ #inventario • Ver tu inventario.
┃ ❏ #mazmorra • Explora la
┃ mazmorra.
┃ ❏ #halloween • Reclama tu dulce
┃ o truco.
┃ ❏ #navidad • Reclama tu regalo 
┃ navideño.
╰━━━━━━━━━━⬣

╭━━━〔 *Gacha*〕
┃ ❏ #rw • Waifu o husbando 
┃ aleatorio.
┃ ❏ #claim • Reclamar un 
┃ personaje.
┃ ❏ ##waifus • Ver tus personajes 
┃ reclamados.
┃ ❏ #wimage • Imagen aleatoria de 
┃ un personaje.
┃ ❏ #winfo • Ver información de 
┃ un personaje.
┃ ❏ #regalar • Regala un personaje.
┃ ❏ #votar • Vota por un personaje.
┃ ❏ #waifustop • Ver el top de
┃ personajes.
╰━━━━━━━━━━⬣

╭━━━〔 *Stickers*〕
┃ ❏ #sticker • Crea un sticker.
┃ ❏ #setmeta • Estable autor para 
┃ los stickers
┃ ❏ #delmeta • Elimina tu pack 
┃ de stickers.
┃ ❏ #pfp • Obtén la foto de 
┃ un usuario
┃ ❏ #qc Crea stickers con texto .
┃ ❏ #img • Convierte stickers 
┃ en imagen.
┃ ❏ #attp • Crea stickers con texto.
┃ ❏ #emojimix • Fuciona 2 emojis y 
┃ crea sticker
┃ ❏ #wm • Cambia el nombre de 
┃ los stickers.
╰━━━━━━━━━━⬣

╭━━━〔 *Herramientas*〕
┃ ❏ #calcular • Calcula ecuaciones.
┃ ❏ #clima • Ver el clima de un pais.
┃ ❏ #horario • Ver el horario global.
┃ ❏ #fake • Crea un mensaje falso 
┃ de un usuario
┃ ❏ #hd • Mejora la calidad de 
┃ una imagen.
┃ ❏ #letra • Cambia la fuente de 
┃ las letras.
┃ ❏ #ver • Ver imágenes de una 
┃ sola vista.
┃ ❏ #shazam • Descubre el nombre
┃ de canciones.
┃ ❏ #ss • Ver el estado de una 
┃ página web.
┃ ❏ #tamaño • Cambia el tamaño 
┃ de imágenes.
┃ ❏ #say • Repetir un mensaje.
┃ ❏ #todoc • Crea documentos de
┃ (audio,imágen).
┃ ❏ #traducir • Traduce palabras.
╰━━━━━━━━━━⬣


╭━━━〔 *Perfil*〕
┃ ❏ #reg • Registra tu nombre y 
┃ edad en el bot
┃ ❏ #unreg • Elimina tu registro 
┃ del bot.
┃ ❏ #profile • Muestra tu perfil 
┃ de usuario.
┃ ❏ #marry • Propón matrimonio a 
┃ otro usuario.
┃ ❏ #divorce • Divorciarte de 
┃ tu pareja.
┃ ❏ #setgenero • Establece tu 
┃ género.
┃ ❏ #delgenero • Elimina tu género 
┃ del perfil 
┃ ❏ #setbirth • Establece fecha de
┃ nacimiento
┃ ❏ #delbirth • Elimina fecha de 
┃ nacimiento 
┃ ❏ #setdesc • Establece 
┃ descripción de perfil 
┃ ❏ #deldesc • Elimina descripción
┃ de perfil
┃ ❏ #lb • Top de usuarios 
┃ ❏ #level • Ver tu nivel y 
┃ experiencia actual.
┃ ❏ #premium • Compra un pase 
┃ premium del bot.
┃ ❏ #confesar • Confiesa 
┃ sentimientos.
╰━━━━━━━━━━⬣

╭━━━〔 *Grupos*〕
┃ ❏ #tag • Envia un mensaje 
┃ mencionando a todos
┃ ❏ #gp • Ver la Informacion 
┃ del grupo.
┃ ❏ #linea • Lista de los usuarios 
┃ en linea.
┃ ❏ #setwelcome • Establecer la
┃ bienvenida
┃ ❏ #setbye • Establecer la 
┃ despedida.
┃ ❏ #link • El bot envia el link
┃ del grupo.
┃ ❏ #admin • Mencionar a los 
┃ admins.
┃ ❏ #revoke • Restablecer el enlace 
┃ del grupo.
┃ ❏ #group open • Abrir grupo.
┃ ❏ #group close • Cerrar grupo.
┃ ❏ #kick • Elimina a un usuario
┃ del grupo.
┃ ❏ #add • Invita a un usuario a 
┃ tu grupo.
┃ ❏ #promote • Promover usuario a 
┃ admin
┃ ❏ #demote • Degradar usuario 
┃ ❏ #gpbanner • Cambia la imagen 
┃ del grupo
┃ ❏ #gpname • Cambia el nombre 
┃ del grupo 
┃ ❏ #gpdesc • Cambiar la descripción
┃ del grupo.
┃ ❏ #warn • Darle una advertencia 
┃ aún usuario.
┃ ❏ #unwarn • Quitar advertencias.
┃ ❏ #advlist • Ver lista de usuarios
┃ advertidos
┃ ❏ #bot on • Enciende el bot en un 
┃ grupo.
┃ ❏ #bot off • Apaga el bot en un
┃ grupo.
┃ ❏ #mute • Elimina los mensajes
┃ del usuario.
┃ ❏ #unmute • Deja de eliminar 
┃ los mensajes.
┃ ❏ #poll • Crea una encuesta.
┃ ❏ #delete • Elimina mensaje de 
┃ otros usuarios
┃ ❏ #fantasmas • Ver lista de 
┃ inactivos.
┃ ❏ #kickfantasmas • Elimina a los 
┃ inactivos.
┃ ❏ #invocar • Invoca a todos los
┃ usuarios.
┃ ❏ #setemoji • Cambia el emojide 
┃ invitación.
┃ ❏ #kicknum • Elimine a usuario 
┃ por el prefijo del pais.
╰━━━━━━━━━━⬣

╭━━━〔 *Anime*〕
┃ ❏ #angry • Estar enojado.
┃ ❏ #bite • Muerde a alguien.
┃ ❏ #bleh • Sacar la lengua.
┃ ❏ #blush • Sonrojarte.
┃ ❏ #bored • Estar aburrido.
┃ ❏ #cry • Llorar por algo o alguien.
┃ ❏ #cuddle • Acurrucarse.
┃ ❏ #dance • Sacate los pasitos 
┃ prohíbidos.
┃ ❏ #drunk • Estar borracho.
┃ ❏ #comer • Comer algo delicioso.
┃ ❏ #facepalm • Darte una palmada 
┃ en la cara.
┃ ❏ #happy • Salta de felicidad.
┃ ❏ #hug • Dar un abrazo.
┃ ❏ #preg • Embarazar a alguien.
┃ ❏ #kill • Toma tu arma y mata a 
┃ alguien.
┃ ❏ #kiss • Dar un beso.
┃ ❏ #laugh • Reírte de algo o
┃ alguien.
┃ ❏ #lick • Lamer a alguien.
┃ ❏ #love • Sentirse enamorado.
┃ ❏ #pat • Acaricia a alguien.
┃ ❏ #poke • Picar a alguien.
┃ ❏ #pout • Hacer pucheros.
┃ ❏ #punch • Dar un puñetazo.
┃ ❏ #run • Correr.
┃ ❏ #sad • Expresar tristeza.
┃ ❏ #scared • Estar asustado.
┃ ❏ #seduce • Seducir a alguien.
┃ ❏ #shy • Sentir timidez.
┃ ❏ #slap • Dar una bofetada.
┃ ❏ #dias • Darle los buenos días 
┃ a alguien.
┃ ❏ #noches • Darle las buenas
┃ noches a alguien
┃ ❏ #sleep • Tumbarte a dormir.
┃ ❏ #smoke • Fumar.
┃ ❏ #think • Pensar en algo.
╰━━━━━━━━━━⬣

╭━━━〔 *NSFW*〕
┃ ❏ #anal • Hacer un anal.
┃ ❏ #waifu • Buscá una waifu 
┃ aleatorio.
┃ ❏ #bath • Bañarse.
┃ ❏ #mamada • Dar una mamada.
┃ ❏ #boobjob • Hacer una rusa.
┃ ❏ #cum • Venirse en alguien.
┃ ❏ #fap • Hacerse una paja.
┃ ❏ #ppcp • Genera imagenes para 
┃ amistades o parejas.
┃ ❏ #footjob • Hacer una paja con 
┃ los pies.
┃ ❏ #fuck • Follarte a alguien.
┃ ❏ #coffe • Tomate un cafecito con 
┃ alguien.
┃ ❏ #violar • Viola a alguien.
┃ ❏ #grabboobs • Agarrrar tetas.
┃ ❏ #grop • Manosear a alguien.
┃ ❏ #lickpussy • Lamer un coño.
┃ ❏ #r34 • Buscar imagenes en 
┃ Rule34.
┃ ❏ #69 • Haz un 69 con alguien.
┃ ❏ #spank • Dar una nalgada.
┃ ❏ #suckboobs • Chupar tetas. 
┃ ❏ #encuerar • Desnudar a alguien.
┃ ❏ #tijeras • Hacer tijeras.
╰━━━━━━━━━━⬣

╭━━━〔 *Juegos*〕
┃ ❏ #amistad • hacer amigos con 
┃ un juego. 
┃ ❏ #chaqueta • Hacerte una 
┃ chaqueta.
┃ ❏ #chiste • La bot te cuenta un 
┃ chiste.
┃ ❏ #consejo • La bot te da un
┃ consejo. 
┃ ❏ #doxear • Simular un doxeo 
┃ falso.
┃ ❏ #facto • La bot te lanza un 
┃ facto. 
┃ ❏ #formarpareja • Forma una 
┃ pareja. 
┃ ❏ #formarpareja5 • Forma 5 
┃ parejas diferentes
┃ ❏ #frase • La bot te da una frase.
┃ ❏ #huevo • Agarrale el huevo a
┃ alguien.
┃ ❏ #chupalo • Hacer que un 
┃ usuario te la chupe
┃ ❏ #aplauso • Aplaudirle a alguien.
┃ ❏ #marron • Burlarte del color de
┃ piel.
┃ ❏ #suicidar • Suicidate. 
┃ ❏ #iq • Calcular el iq de alguna
┃ persona.
┃ ❏ #meme • La bot te envía un 
┃ meme aleatorio.
┃ ❏ #morse • Convierte un texto a
┃ codigo morse.
┃ ❏ #nombreninja • Nombre ninja 
┃ aleatorio.
┃ ❏ #paja • La bot te hace una paja.
┃ ❏ #personalidad • Busca tu 
┃ personalidad. 
┃ ❏ #piropo • Lanza un piropo.
┃ ❏ #pregunta • Hazle una pregunta 
┃ a la bot.
┃ ❏ #ship • Probabilidad de 
┃ enamorarte
┃ ❏ #sorteo • Empieza un sorteo. 
┃ ❏ #top • Empieza un top de
┃ personas.
┃ ❏ #formartrio • Forma un trio.
┃ ❏ #ahorcado • Juega el juego
┃ ahorcado.
┃ ❏ #mates • Preguntas de 
┃ matemáticas
┃ ❏ #ppt • Juega piedra papel o 
┃ tijeras.
┃ ❏ #sopa • Juego de sopa de 
┃ letras
┃ ❏ #pvp • Juega un pvp contra otro 
┃ usuario.
╰━━━━━━━━━━⬣


    `.trim()

    await conn.sendMessage(m.chat, { 
        text: txt,
        contextInfo: {
            mentionedJid: [m.sender, userId],
            externalAdReply: {
                title: `🤖 ${botname} - Menu Principal`,
                body: textbot,
                thumbnailUrl: banner,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            },
            forwardingScore: 999
        }
    }, { quoted: m })
}

handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu|menú|help|ayuda)$/i

export default handler

function clockString(ms) {
    let d = Math.floor(ms / (1000 * 60 * 60 * 24))
    let h = Math.floor((ms / (1000 * 60 * 60)) % 24
    let m = Math.floor((ms / (1000 * 60)) % 60
    let s = Math.floor((ms / 1000)) % 60
    return [d > 0 ? `${d}d ` : '', h > 0 ? `${h}h ` : '', m > 0 ? `${m}m ` : '', s > 0 ? `${s}s` : ''].join('').trim() || '0s'
}
/*───────────────────────────────────────
  📁 Módulo:     reto.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

import fs from 'fs'
import path from 'path'

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender)

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  const retos = [
    'Baila como si nadie te estuviera mirando durante 1 minuto.',
    'Imita a tu personaje de película favorito.',
    'Envía un mensaje de texto a la persona que menos te gusta.',
    'Haz una llamada a un amigo y dile que lo amas.',
    'Come una cucharada de mostaza.',
    'Haz 10 flexiones.',
    'Canta una canción en voz alta.',
    'Haz una imitación de un animal.',
    'Deja que alguien te pinte la cara.',
    'Haz una pose ridícula y manténla durante 30 segundos.',
    'Habla con acento durante 5 minutos.',
    'Publica una foto vergonzosa en tus redes sociales.',
    'Haz un truco de magia.',
    'Baila con una escoba como si fuera tu pareja.',
    'Llama a un amigo y dile que has ganado la lotería.',
    'Haz una declaración de amor a alguien en el grupo.',
    'Come un trozo de fruta con los ojos vendados.',
    'Haz una lista de tus 5 peores hábitos.',
    'Deja que alguien te haga un peinado loco.',
    'Haz una serenata a alguien en el grupo.',
    'Dibuja algo en la cara de alguien mientras duerme.',
    'Haz una broma a alguien en el grupo.',
    'Escribe un poema sobre alguien en el grupo.',
    'Haz un video de ti mismo haciendo algo ridículo.',
    'Deja que alguien elija tu atuendo por un día.',
    'Haz una declaración de amor a un objeto inanimado.',
    'Come algo picante y no bebas agua durante 5 minutos.',
    'Haz una lista de tus 3 mayores miedos.',
    'Haz un baile tonto en público.',
    'Canta en la ducha y graba un video.',
    'Haz un reto de selfies con caras graciosas.',
    'Deja que alguien te dé un apodo y úsalo por un día.',
    'Haz una imitación de un famoso.',
    'Escribe un mensaje de amor a tu ex.',
    'Haz un dibujo con los ojos cerrados.',
    'Deja que alguien te haga un maquillaje loco.',
    'Haz un reto de lengua traba.',
    'Canta una canción en otro idioma.',
    'Haz una lista de tus 5 cosas más vergonzosas.',
    'Deja que alguien elija un lugar para que vayas a comer.',
    'Haz un video de ti mismo haciendo un lip sync.',
    'Imita a un profesor o jefe.',
    'Haz un reto de "no reírse" con alguien.',
    'Publica un estado en tus redes sociales que no tenga sentido.',
    'Haz una broma a un extraño.',
    'Crea un meme sobre ti mismo.',
    'Haz un reto de "no hablar" durante 5 minutos.',
    'Deja que alguien te elija un tatuaje temporal.',
    'Haz un video de ti mismo haciendo un baile viral.',
    'Canta una canción de amor a alguien en el grupo.',
    'Haz un reto de "verdad o reto" con un extraño.',
    'Deja que alguien te elija un sabor de helado raro.',
    'Haz una lista de tus 3 cosas favoritas de alguien en el grupo.',
    'Imita a un animal durante 1 minuto.',
    'Haz un reto de "no usar el teléfono" durante 1 hora.',
    'Publica una foto de tu comida en tus redes sociales.',
    'Haz un dibujo de alguien en el grupo.',
    'Deja que alguien te elija un lugar para que vayas a pasear.',
    'Haz un reto de "no mirar" durante 5 minutos.',
    'Canta una canción de tu infancia.',
    'Haz un video de ti mismo haciendo un reto de baile.',
    'Deja que alguien te elija un sabor de chicle raro.',
    'Haz una lista de tus 3 cosas más raras.',
    'Imita a un personaje de dibujos animados.',
    'Haz un reto de "no comer" durante 1 hora.',
    'Publica una foto de tu lugar favorito en tus redes sociales.',
    'Haz un dibujo de algo que te haga feliz.',
    'Deja que alguien te elija un atuendo para una cita.',
    'Haz un video de ti mismo haciendo un reto de cocina.',
    'Canta una canción de una película.',
    'Haz un reto de "no hablar" durante 10 minutos.',
    'Publica una foto de tu mascota en tus redes sociales.',
    'Haz un dibujo de algo que te asuste.',
    'Deja que alguien te elija un sabor de pizza raro.',
    'Haz un video de ti mismo haciendo un reto de ejercicio.',
    'Canta una canción de los 80.',
    'Haz un reto de "no usar el teléfono" durante 2 horas.',
    'Publica una foto de tu lugar de trabajo en tus redes sociales.',
    'Haz un dibujo de algo que te haga reír.',
    'Deja que alguien te elija un atuendo para un evento.',
    'Haz un video de ti mismo haciendo un reto de maquillaje.',
    'Canta una canción de los 90.',
    'Haz un reto de "no comer" durante 2 horas.',
    'Publica una foto de tu libro favorito en tus redes sociales.',
    'Haz un dibujo de algo que te haga llorar.',
    'Deja que alguien te elija un sabor de helado raro.',
    'Haz un video de ti mismo haciendo un reto de manualidades.',
    'Canta una canción de tu artista favorito.',
    'Haz un reto de "no usar el teléfono" durante 3 horas.',
    'Publica una foto de tu lugar de vacaciones en tus redes sociales.',
    'Haz un dibujo de algo que te haga sentir nostálgico.',
    'Deja que alguien te elija un atuendo para un día de trabajo.',
    'Haz un video de ti mismo haciendo un reto de baile en pareja.',
    'Canta una canción de una serie de televisión.',
    'Haz un reto de "no comer" durante 3 horas.',
    'Publica una foto de tu comida favorita en tus redes sociales.',
    'Haz un dibujo de algo que te haga sentir orgulloso.',
    'Deja que alguien te elija un sabor de bebida raro.',
    'Haz un video de ti mismo haciendo un reto de cocina en pareja.',
    'Canta una canción de tu infancia en voz alta.'
  ]

  let reto = retos[Math.floor(Math.random() * retos.length)]

  let str =
    who === m.sender
      ? `╭──〔 🎭 YO TE RETO  〕──╮\n` +
        `┃ ${name2}, tu reto es:\n┃ ${reto}\n` +
        `╰─────────────────────────╯`
      : `╭──〔 🤝 RETO ENTREGADO 〕──╮\n` +
        `┃ ${ a ${name}\n┃ Reto: ${reto}\n` +
        `╰─────────────────────────╯`

  if (m.isGroup) {
    await conn.sendMessage(
      m.chat,
      {
        text: str,
        mentions: [who]
      },
      { quoted: m }
    )
  }
}

handler.help = ['reto']
handler.tags = ['fun']
handler.command = ['reto']
handler.group = true

export default handler
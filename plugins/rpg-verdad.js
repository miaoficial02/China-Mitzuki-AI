/*───────────────────────────────────────
  📁 Módulo:     verdad.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
  🔗 GitHub:     https://github.com/Kone457/Shizuka-AI
───────────────────────────────────────*/

let handler = async (m, { conn }) => {
  let who = m.mentionedJid.length > 0
    ? m.mentionedJid[0]
    : (m.quoted ? m.quoted.sender : m.sender)

  let name = await conn.getName(who)
  let name2 = await conn.getName(m.sender)

  const preguntas = [
        '¿Cuál es tu mayor miedo?.',
    '¿Alguna vez has tenido un crush en un amigo?',
    '¿Cuál es la cosa más vergonzosa que has hecho?',
    '¿Qué es lo más raro que has comido?',
    '¿Alguna vez has mentido para salir de un problema?',
    '¿Cuál es tu secreto más grande?',
    '¿Qué es lo que más te gusta de ti mismo?',
    '¿Alguna vez has tenido un sueño extraño? Cuéntalo.',
    '¿Cuál es tu mayor arrepentimiento?',
    '¿Qué es lo más loco que has hecho por amor?',
    '¿Tienes alguna fobia extraña?',
    '¿Cuál es tu mayor inseguridad?',
    '¿Alguna vez has hecho trampa en un examen?',
    '¿Cuál es tu mayor secreto que nadie conoce?',
    '¿Qué es lo más vergonzoso que tus padres han hecho en público?',
    '¿Alguna vez has tenido una pelea con un amigo? ¿Por qué?',
    '¿Cuál es tu mayor sueño?',
    '¿Qué es lo que más te molesta de tus amigos?',
    '¿Alguna vez has llorado por una película? ¿Cuál?',
    '¿Cuál es la cosa más loca que has hecho en una fiesta?',
    '¿Tienes alguna superstición?',
    '¿Cuál es tu mayor deseo?',
    '¿Alguna vez has tenido un amor platónico? ¿Quién?',
    '¿Qué es lo que más te gustaría cambiar de ti?',
    '¿Cuál es tu mayor miedo en una relación?',
    '¿Alguna vez has hecho algo ilegal?',
    '¿Cuál es tu mayor secreto sobre tu vida amorosa?',
    '¿Qué es lo más raro que has coleccionado?',
    '¿Alguna vez has tenido un sueño que se hizo realidad?',
    '¿Cuál es tu mayor logro hasta ahora?',
    '¿Qué es lo que más te gusta hacer en tu tiempo libre?',
    '¿Alguna vez has tenido un amor a distancia?',
    '¿Cuál es tu mayor debilidad?',
    '¿Qué es lo que más te gustaría aprender?',
    '¿Alguna vez has tenido una experiencia paranormal?',
    '¿Cuál es tu mayor miedo al futuro?',
    '¿Qué es lo más loco que has hecho por un amigo?',
    '¿Alguna vez has tenido un secreto que te ha pesado mucho?',
    '¿Cuál es tu mayor sueño de infancia?',
    '¿Qué es lo que más te gustaría hacer antes de morir?',
    '¿Alguna vez has tenido un amor no correspondido?',
    '¿Cuál es tu mayor arrepentimiento en una relación?',
    '¿Qué es lo más extraño que has hecho en un sueño?',
    '¿Alguna vez has tenido una experiencia embarazosa en el trabajo?',
    '¿Cuál es tu mayor miedo al hablar en público?',
    '¿Qué es lo que más te gustaría cambiar en el mundo?',
    '¿Alguna vez has tenido un crush en un profesor?',
    '¿Cuál es tu mayor secreto sobre tu familia?',
    '¿Qué es lo más loco que has hecho en un viaje?',
    '¿Alguna vez has tenido una pelea con un familiar? ¿Por qué?',
    '¿Cuál es tu mayor miedo a la soledad?',
    '¿Qué es lo que más te gustaría hacer si tuvieras un día libre?',
    '¿Alguna vez has tenido un sueño recurrente? ¿Cuál?',
    '¿Cuál es tu mayor deseo en la vida?',
    '¿Qué es lo más raro que has hecho por un reto?',
    '¿Alguna vez has tenido un amor platónico en la escuela?',
    '¿Cuál es tu mayor miedo a la intimidad?',
    '¿Qué es lo que más te gustaría cambiar de tu vida?',
    '¿Alguna vez has hecho algo por celos?',
    '¿Cuál es tu mayor secreto sobre tus amigos?',
    '¿Qué es lo más loco que has hecho en un concierto?',
    '¿Alguna vez has tenido una experiencia extraña con un extraño?',
    '¿Cuál es tu mayor miedo a la muerte?',
    '¿Qué es lo que más te gustaría hacer si tuvieras un superpoder?',
    '¿Alguna vez has tenido un amor prohibido?',
    '¿Cuál es tu mayor arrepentimiento en la vida?',
    '¿Qué es lo más extraño que has hecho en una cita?',
    '¿Alguna vez has tenido un sueño que te ha dejado pensando?',
    '¿Cuál es tu mayor miedo a la traición?',
    '¿Qué es lo que más te gustaría hacer si tuvieras un millón de dólares?',
    '¿Alguna vez has tenido un secreto que te ha hecho sentir culpable?',
    '¿Cuál es tu mayor deseo en una relación?',
    '¿Qué es lo más loco que has hecho por un desafío?',
    '¿Alguna vez has tenido un amor a primera vista?',
    '¿Cuál es tu mayor miedo a la crítica?',
    '¿Qué es lo que más te gustaría hacer si pudieras viajar en el tiempo?',
    '¿Alguna vez has tenido una experiencia extraña en un lugar público?',
    '¿Cuál es tu mayor secreto sobre tu vida personal?',
    '¿Qué es lo más raro que has hecho por un amigo?',
    '¿Alguna vez has tenido un amor que no debías tener?',
    '¿Cuál es tu mayor miedo a la soledad en la vejez?',
    '¿Qué es lo que más te gustaría hacer si pudieras ser famoso?',
    '¿Alguna vez has tenido un sueño que te ha asustado?',
    '¿Cuál es tu mayor deseo en tu carrera?',
    '¿Qué es lo más loco que has hecho por un reto de redes sociales?',
    '¿Alguna vez has tenido un amor que te ha cambiado la vida?',
    '¿Cuál es tu mayor miedo a la decepción?',
    '¿Qué es lo que más te gustaría hacer si pudieras vivir en otro país?',
    '¿Alguna vez has tenido una experiencia extraña en un viaje?',
    '¿Cuál es tu mayor secreto sobre tus relaciones?',
    '¿Qué es lo más raro que has hecho en una fiesta?',
    '¿Alguna vez has tenido un amor que no fue correspondido?',
    '¿Cuál es tu mayor miedo a la soledad en la adolescencia?',
    '¿Qué es lo que más te gustaría hacer si pudieras cambiar tu pasado?',
    '¿Alguna vez has tenido un sueño que te ha inspirado?',
    '¿Cuál es tu mayor deseo en tu vida personal?',
    '¿Qué es lo más loco que has hecho por un amigo en apuros?',
    '¿Alguna vez has tenido un amor que te ha hecho sufrir?',
    '¿Cuál es tu mayor miedo a la pérdida?',
    '¿Qué es lo que más te gustaría hacer si pudieras ser otra persona por un día?'
  ]

  let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)]

  let str =
    who === m.sender
      ? `╭─〔 🔥 Te atreves a decir la verdad 😏 〕─╮\n` +
        `┃ ${name2}, comparte tu verdad:\n┃ ${pregunta}\n` +
        `╰──────────────────────╯\n` +
        `🤖 *Shizuka-AI* conoce la verdad... ¿la dirás tú?`
      : `╭──〔 🔎 Te atreves a decir la verdad 〕──╮\n` +
        `┃ ${name2} desea saber de ${name}:\n┃ ${pregunta}\n` +
        `╰─────────────────────────────╯\n` +
        `🎭 *Shizuka-AI* observa. No hay secretos seguros.`

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

handler.help = ['verdad']
handler.tags = ['fun']
handler.command = ['verdad']
handler.group = true

export default handler
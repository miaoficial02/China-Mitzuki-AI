const handler = async (conn, { message }) => {

    const desafio = pickRandom(global.reto);

    await conn.sendMessage(message.key.remoteJid, {

        text: `*◤ ────「 𝚁 𝙴 𝚃 𝙾 」──── ◥*\n\n⚄︎ ${desafio}\n\n*◣ ────「  SHIZUKA 」── ◢*`,

        quoted: message

    });

};

module.exports = {

    command: 'reto',

    handler,

};

function pickRandom(list) {

    return list[Math.floor(Math.random() * list.length)];

}

global.reto = [

  "comer 2 cucharadas de arroz sin guarniciones, si se está arrastrando se puede beber", "derrama gente que te hace pausar", "llama a crush ahora y envíarle quiero terminar ahora y manda cartura al grupos", "soltar solo emoticón cada vez que escribes en grupo durante 1 día.", "di ¡Bienvenido a Quién Quiere Ser Millonario! a todos los grupos que tengas", "canta el coro de la última canción que tocaste", "Golpea la mesa (que está en casa) hasta que te regañen por hacer ruido", "Dile a la gente al azar _Me acaban de decir que primero era tu gemelo, nos separamos, luego me hice una cirugía plástica. Y esto es lo más ciyusss_", "menciona el nombre de tu ex", "¡haz 1 rima con (teta, culo) para los miembros grupo 😂!", "envía el contacto de tu novia/o al grupo","Chatea con personas al azar con lenguaje cheto y luego enviar aquí", "cuenta tu propia versión de las cosas vergonzosas", "etiqueta a la persona que odias","Fingir estar poseído, por ejemplo: poseído por perro, poseído por saltamontes, poseído por refrigerador, etc.","cambiar nombre a *SOY BURRO* por 24 horas", "grita *SOY GAY* frente a tu casa", "¡dime tu tipo de novio!", "Di *estoy enamorado de ti, ¿quieres ser mi novia?* al sexo opuesto, la última vez que chateaste (enviar captura), espera a que te responda, si es así, déjalo aquí", "Manda un audio cantado la vaca loca", "bromea con tu ex y di *te amo, por favor vuelve* ¡sin decir atrévete!", "cambiar tu nombre a *Soy gay* por 5 horas", "ponerte de foto de perfil la primera que salga el tu galeria, durante 3 días", "enviar una nota de voz diciendo ¿puedo llamarte bebé?", "¡Di *ERES TAN HERMOSO, NO MIENTEN* a los chicos!", "dile a un miembro del grupo randow (TE AMO)", "Actúa como una gallina delante de tus padres", "Toma un libro al azar y lee una página en voz alta, y envíalo aquí", "Abre la puerta de tu casa y aúlla como un lobo durante 10 segundos", "Tómate una selfie vergonzosa y pégala en tu foto de perfil", "Que el grupo elija una palabra y una canción conocida. Tienes que cantar esa canción y enviarla en nota de voz", "Cuéntame la historia más triste que conozcas", "haz un video bailado (dame tu cosita) y ponlo en estado durante 5 minutos", "Muestre las últimas cinco personas a las que envió mensajes de texto y lo que decían los mensajes", "ponga su nombre completo en el estado durante 5 horas", "haz un video de baile corto sin ningún filtro solo con música y ponlo en tu estado durante 5 horas", "Llama a tu mejor amiga, perra", "pon tu foto sin filtro en tu estado durante 10 minutos", "di que amo a LoliBot en nota de voz 😂", "Envíale un mensaje a tu ex y dile que todavía me gustas", "Llama a Crush/novia ahora y haz una captura de pantalla aquí", "Accede al chat personal de uno de los miembros del grupo y dile (puto/a) 😂", "dile ERES HERMOSO/GUAPO a una de las personas que está en la parte superior de tu lista de favoritos o la primera persona en tu lista de chat", "pon la foto de tu enamorado en el estado con el título: Tiene pito corto 😂", "cambio de nombre a SOY GAY durante 5 horas", "chatea con cualquier contacto en whatsapp y di que seré tu novio/novia durante 5 horas", "enviar una nota de voz que diga que estoy enamorado de ti, ¿quieres ser mi novia/novio o no? a cualquier persona aleatoria del grupo (si eres una chica, elige un chico, si un chico elige una chica", "Golpea tu trasero apenas envía el sonido de una bofetada a través de la nota de voz 🤣", "indique su tipo de novia/novia y envíe la foto aquí con el título, la niña/niño más feo del mundo", "grita bravooooooooo y envía aquí a través de nota de voz", "toma tu cara y envíala aquí", "Envía tu foto con un pie de foto, soy lesbiana", "grita cabrón delante de tu mamá/papá", "cambiar el nombre a soy idiota por 3 horas", "di que amor al propietario del bot Carlos por audio 😆", "envía la foto de tu novia/novia aquí", "haga cualquier video de desafío de baile tiktok y póngalo en estado, puede eliminarlo después de 5 horas", "rompe con tu mejor amigo durante 5 horas sin decirle que es un reto", "dile a uno de tus amigos que lo amas y que quieres casarte con él/ella, sin decirle que es un desafío", "Escriba Me siento cachondo y póngalo en estado, puede eliminarlo solo después de 5 horas", "escriba soy lesbiana y póngalo en estado, puede eliminarlo solo después de 5 horas", "ponga el nombre de su padre en el estado durante 5 horas", "envíe palabras abusivas en cualquier grupo, excepto en este grupo, y envíe una prueba de captura de pantalla aquí",

];
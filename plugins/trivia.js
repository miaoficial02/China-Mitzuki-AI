
const preguntas = [
    {pregunta: "¿Cuál es el planeta más grande del sistema solar?", respuesta: "jupiter"},
    {pregunta: "¿Cuántos continentes hay en la Tierra?", respuesta: "7"},
    {pregunta: "¿Cuál es el animal terrestre más rápido?", respuesta: "guepardo"},
    {pregunta: "¿En qué año terminó la Segunda Guerra Mundial?", respuesta: "1945"}
];

async function handler(conn, { message, args }) {
    const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    
    await conn.sendMessage(message.key.remoteJid, {
        text: `🎮 *TRIVIA*\n\n${pregunta.pregunta}\n\nResponde con .respuesta [tu_respuesta]`,
        quoted: message
    });
}

module.exports = {
    command: 'trivia',
    handler
};

import fetch from 'node-fetch';

const mssg = {
    error: '💥 *Ups… no pude obtener una imagen para adivinar.* Intenta de nuevo más tarde.',
};

// Función para enviar respuestas
const reply = (text, conn, m) => {
    conn.sendMessage(m.chat, { text }, { quoted: m });
};

// Handler del comando
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        const apiUrl = 'https://api.vreden.my.id/api/tebakgambar';
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.result || json.result.length === 0) {
            return reply(mssg.error, conn, m);
        }

        const data = json.result[0];
        const imageUrl = data.image;
        const answer = data.jawaban;

        // Guardar la respuesta en la sesión del usuario (si tu bot lo permite)
        // Por ejemplo: global.db.data.users[m.sender].tebakgambar = answer;

        await conn.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: `🧩 *¡Adivina la imagen!*\n\nResponde con tu mejor intento.\n\n⌛ Tienes 1 minuto para responder.`,
        }, { quoted: m });

        // Opcional: puedes usar setTimeout para revelar la respuesta después de 60 segundos
        setTimeout(() => {
            conn.sendMessage(m.chat, {
                text: `⏰ *Tiempo terminado!*\n📢 La respuesta era: *${answer}*`,
            }, { quoted: m });
        }, 60000);

    } catch (e) {
        console.error('❌ Error al obtener imagen de Tebak Gambar:', e.message);
        return reply(mssg.error, conn, m);
    }
};

handler.command = /^(tebakgambar|adivinaimg|gambarquiz)$/i;
export default handler;
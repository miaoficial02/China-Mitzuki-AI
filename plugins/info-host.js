import fetch from 'node-fetch';

const juegos = global.db = global.db || {};
juegos.tebakgambar = juegos.tebakgambar || {};

let handler = async (m, { conn, usedPrefix, command }) => {
    if (command === 'tebakgambar') {
        try {
            const res = await fetch('https://api.vreden.my.id/api/tebakgambar');
            const json = await res.json();

            if (!json.result || json.result.length === 0) {
                return conn.sendMessage(m.chat, {
                    text: '💥 *No pude obtener una imagen.* Intenta más tarde.',
                }, { quoted: m });
            }

            const data = json.result[0];
            const imageUrl = data.image;
            const answer = data.jawaban.toLowerCase().replace(/^jawaban\s*/i, '').trim();

            // Guardar sesión para el usuario
            if (juegos.tebakgambar[m.sender]) clearTimeout(juegos.tebakgambar[m.sender].timeout);
            juegos.tebakgambar[m.sender] = {
                answer,
                timeout: setTimeout(() => {
                    conn.sendMessage(m.chat, {
                        text: `⌛ *Tiempo agotado*\n📢 La respuesta era: *${answer}*`,
                    }, { quoted: m });
                    delete juegos.tebakgambar[m.sender];
                }, 60000),
            };

            await conn.sendMessage(m.chat, {
                image: { url: imageUrl },
                caption: `🧩 *¡Adivina la imagen, ${m.pushName}!*\n⌛ Tienes *60 segundos*. Responde en el chat~`,
            }, { quoted: m });

        } catch (e) {
            console.error('❌ Error en tebakgambar:', e.message);
            await conn.sendMessage(m.chat, {
                text: '💥 *Hubo un error al iniciar el juego.*',
            }, { quoted: m });
        }
    } else {
        // Si NO es el comando, validamos si hay respuesta
        const session = juegos.tebakgambar[m.sender];
        if (!session || !session.answer) return;

        const userAnswer = m.text.toLowerCase().trim();
        const correct = session.answer;

        if (userAnswer === correct) {
            clearTimeout(session.timeout);
            delete juegos.tebakgambar[m.sender];

            await conn.sendMessage(m.chat, {
                text: `🎉 *¡Correcto, ${m.pushName}!* La respuesta es *${correct}* 👏`,
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                text: `❌ *No es correcto, ${m.pushName}~*\nInténtalo otra vez mientras quede tiempo 🕐`,
            }, { quoted: m });
        }
    }
};

handler.customPrefix = /^\.?tebakgambar$/i;
handler.command = /^.*$/; // escucha TODO
export default handler;
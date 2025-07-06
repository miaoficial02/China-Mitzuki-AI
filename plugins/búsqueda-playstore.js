
import fetch from 'node-fetch';

const mssg = {
    noQuery: '🔍 *¿Qué app estás buscando?* Por favor, proporciona un nombre o palabra clave.',
    notFound: '😕 *No encontré resultados.* Intenta con otro término o revisa la ortografía.',
    error: '💥 *Algo salió mal al buscar en la Play Store.* Intenta más tarde.',
};

// Función de respuesta
const reply = (text, conn, m) => {
    conn.sendMessage(m.chat, { text }, { quoted: m });
};

// Handler del comando
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) return reply(mssg.noQuery, conn, m);

    try {
        const apiUrl = `https://api.vreden.my.id/api/playstore?query=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.result || json.result.length === 0) {
            return reply(mssg.notFound, conn, m);
        }

        // Mostrar hasta 5 resultados con imagen incluida
        for (let app of json.result.slice(0, 5)) {
            const nombre = app.nama || app.nombre;
            const dev = app.developer || app.desarrollador;
            const rate = app.rate || app.calificación;
            const link = app.link;
            const devLink = app.link_dev;
            const icon = app.img;

            await conn.sendMessage(m.chat, {
                image: { url: icon },
                caption: `📲 *${nombre}*\n👨‍💻 Desarrollador: ${dev}\n⭐ ${rate}\n🔗 [Ver en Play Store](${link})\n🏢 [Más del desarrollador](${devLink})`,
            }, { quoted: m });
        }

    } catch (e) {
        console.error('❌ Error al consultar la API de Play Store:', e.message);
        return reply(mssg.error, conn, m);
    }
};

handler.command = /^(playstore|ps|buscarapp)$/i;
export default handler;
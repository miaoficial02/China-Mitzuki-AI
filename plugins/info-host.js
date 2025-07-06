import fetch from 'node-fetch';

const mssg = {
    noQuery: '🔍 *Por favor, proporciona un nombre de usuario para buscar en Instagram.*\n\nEjemplo:\n`.iguser yahyaalmthr`',
    notFound: '😕 *No se encontraron resultados para ese nombre de usuario.*',
    error: '💥 *Ocurrió un error al consultar el perfil.* Intenta más tarde.',
};

const reply = (text, conn, m) => {
    conn.sendMessage(m.chat, { text }, { quoted: m });
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return reply(mssg.noQuery, conn, m);

    try {
        const apiUrl = `https://api.vreden.my.id/api/instagram/users?query=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        if (!json.result || !json.result.usuarios || json.result.usuarios.length === 0) {
            return reply(mssg.notFound, conn, m);
        }

        const user = json.result.usuarios[0]; // Primer resultado
        const {
            nombre_completo,
            nombre_de_usuario,
            is_private,
            is_verified,
            URL_de_la_foto_de_perfil,
            id,
        } = {
            nombre_completo: user.nombre_completo,
            nombre_de_usuario: user["nombre de usuario"],
            is_private: user.is_private,
            is_verified: user.is_verified,
            URL_de_la_foto_de_perfil: user["URL de la foto de perfil"],
            id: user.id,
        };

        const caption = `📸 *Perfil de Instagram encontrado:*\n\n` +
            `👤 Nombre: *${nombre_completo}*\n` +
            `🔗 Usuario: *@${nombre_de_usuario}*\n` +
            `🆔 ID: ${id}\n` +
            `🔒 Privado: ${is_private ? 'Sí' : 'No'}\n` +
            `✅ Verificado: ${is_verified ? 'Sí' : 'No'}`;

        await conn.sendMessage(m.chat, {
            image: { url: URL_de_la_foto_de_perfil },
            caption,
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al consultar Instagram:', e.message);
        return reply(mssg.error, conn, m);
    }
};

handler.command = /^(iguser|instauser|buscarig)$/i;
export default handler;
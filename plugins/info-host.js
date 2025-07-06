import fetch from 'node-fetch';

const mssg = {
    noQuery: '🔍 *Por favor, proporciona un nombre de usuario para buscar en Instagram.*\n\nEjemplo:\n`.iguser yahyaalmthr`',
    notFound: '😕 *No se encontraron resultados para ese nombre de usuario.*',
    error: '💥 *Ocurrió un error al consultar el perfil.* Intenta más tarde.',
};

const reply = (text, conn, m) => {
    conn.sendMessage(m.chat, { text }, { quoted: m });
};

let handler = async (m, { conn, text }) => {
    if (!text) return reply(mssg.noQuery, conn, m);

    try {
        const apiUrl = `https://api.vreden.my.id/api/instagram/users?query=${encodeURIComponent(text)}`;
        const res = await fetch(apiUrl);
        const json = await res.json();

        const users = json?.result?.users;
        if (!users || users.length === 0) {
            return reply(mssg.notFound, conn, m);
        }

        const user = users[0];

        const caption = `📸 *Perfil de Instagram:*\n\n` +
            `👤 Nombre: *${user.full_name}*\n` +
            `🔗 Usuario: *@${user.username}*\n` +
            `🆔 ID: ${user.id}\n` +
            `🔒 Privado: ${user.is_private ? 'Sí' : 'No'}\n` +
            `✅ Verificado: ${user.is_verified ? 'Sí' : 'No'}\n`;

        await conn.sendMessage(m.chat, {
            image: { url: user.profile_pic_url },
            caption,
        }, { quoted: m });

    } catch (e) {
        console.error('❌ Error al consultar Instagram:', e.message);
        return reply(mssg.error, conn, m);
    }
};

handler.command = /^(iguser|instauser|buscarig)$/i;
export default handler;
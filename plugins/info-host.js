import fetch from 'node-fetch';

const mssg = {
    noUrl: '🌐 *¿Olvidaste la URL?* Por favor, indícame el sitio que deseas verificar.\n\nEjemplo:\n`.cekhost https://www.vreden.my.id`',
    error: '💥 *Ups… hubo un error al intentar verificar el estado del sitio.* Inténtalo de nuevo más tarde.',
    notReachable: '🚫 *No se obtuvo respuesta desde los nodos consultados.* El host podría estar fuera de línea o inaccesible.',
};

// Función para enviar respuesta simple
const reply = (texto, conn, m) => {
    conn.sendMessage(m.chat, { text: texto }, { quoted: m });
};

// Handler principal
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return reply(mssg.noUrl, conn, m);

    try {
        const url = `https://api.vreden.my.id/api/tools/cekhost?url=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.result || !json.result.cheques || json.result.cheques.length === 0) {
            return reply(mssg.notReachable, conn, m);
        }

        let replyText = `🎀 *Estado del Host:* _${text}_\n🆔 ID de solicitud: *${json.result.id_de_solicitud}*\n\n`;

        for (const check of json.result.cheques) {
            const s = check.servidor;
            const h = check.http_check;

            replyText += `🌸 *Nodo:* ${s.ciudad}, ${s.país} (${s.host})\n`;
            replyText += `   🛰 IP Nodo: ${s.ip}  |  ASN: ${s.id}\n`;
            replyText += `   📡 IP Web: ${h.ip_web}  |  Ping: ${h.ping}s\n`;
            replyText += `   ⚙️ Código HTTP: ${h["código_de_estado"]} (${h.resultado})\n\n`;
        }

        await conn.sendMessage(m.chat, {
            text: replyText.trim(),
            linkPreview: false,
        }, { quoted: m });

    } catch (error) {
        console.error('❌ Error con la API CekHost:', error.message);
        return reply(mssg.error, conn, m);
    }
};

handler.command = /^(cekhost|checkhost|hostcheck)$/i;
export default handler;
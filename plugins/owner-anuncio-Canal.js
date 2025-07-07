import QRCode from 'qrcode';

const handler = async (m, { args, usedPrefix, command }) => {
    const texto = args.join(' ');
    if (!texto) {
        return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <texto o URL>\n\nEjemplo:\n${usedPrefix + command} https://tubot.com/panel`);
    }

    try {
        const qr = await QRCode.toBuffer(texto, { type: 'png' });
        await conn.sendMessage(m.chat, {
            image: qr,
            caption: `🔲 *Código QR generado para:*\n${texto}`
        }, { quoted: m });
    } catch (err) {
        console.error('❌ Error al generar QR:', err);
        await m.reply('❌ *Hubo un error generando el código QR.* Asegúrate de que el texto sea válido.');
    }
};

handler.help = ['qr <texto o URL>'];
handler.tags = ['tools', 'util'];
handler.command = ['qr', 'qrcode', 'generarqr'];

export default handler;
import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import path from 'path';

const handler = async (m, { args, usedPrefix, command }) => {
    const texto = args.join(' ');
    if (!texto) {
        return m.reply(`📌 *Uso correcto:*\n${usedPrefix + command} <texto o URL>\n\nEjemplo:\n${usedPrefix + command} https://tubot.com/panel`);
    }

    try {
        const dataUrl = await QRCode.toDataURL(texto);
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const filePath = path.join('./temp', `qr_${Date.now()}.png`);
        writeFileSync(filePath, base64Data, 'base64');

        await conn.sendMessage(m.chat, {
            image: { url: filePath },
            caption: `🔲 *Código QR generado para:*\n${texto}`
        }, { quoted: m });

    } catch (err) {
        console.error('❌ Error al generar QR:', err);
        await m.reply('❌ *Hubo un error generando el código QR.* Asegúrate de que el texto sea válido.');
    }
};

handler.help = ['qrc <texto o URL>'];
handler.tags = ['tools', 'util'];
handler.command = ['qr', 'qrcode', 'generarqr'];

export default handler;
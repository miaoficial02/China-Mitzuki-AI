import { makeWASocket, generateProfilePicture } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply('⚠️ Te faltó la imagen para el perfil del grupo.');

    try {
      // Procesar imagen en formato correcto
      const { img: preview, preview: full } = await generateProfilePicture(img);

      await conn.updateProfilePicture(m.chat, preview);
      m.reply('✅ Perfecto.');
    } catch (e) {
      m.reply(`⚠️ Ocurrió un error: ${e.message}`);
    }
  } else {
    return m.reply('⚠️ Te faltó la imagen para cambiar el perfil del grupo.');
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
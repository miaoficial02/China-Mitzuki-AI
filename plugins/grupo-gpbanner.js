import sharp from 'sharp';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/image/.test(mime)) {
    let img = await q.download();
    if (!img) return m.reply('⚠️ Te faltó la imagen para el perfil del grupo.');

    try {
      const buffer = await sharp(img)
        .resize(720, 720)
        .jpeg({ quality: 80 })
        .toBuffer();

      await conn.updateProfilePicture(m.chat, buffer);
      m.reply('✅ Perfecto, imagen actualizada.');
    } catch (e) {
      m.reply(`⚠️ Error al actualizar el perfil: ${e.message}`);
    }
  } else {
    m.reply('⚠️ Te faltó la imagen para cambiar el perfil del grupo.');
  }
};

handler.command = ['gpbanner', 'groupimg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
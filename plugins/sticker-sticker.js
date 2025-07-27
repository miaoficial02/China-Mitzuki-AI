
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
  let stiker = false
  const thumbnailCard = 'https://files.catbox.moe/e271al.jpg' // Miniatura usada en la tarjeta

  try {
    const q = m.quoted ? m.quoted : m
    const mime = (q.msg || q).mimetype || q.mediaType || ''

    if (/webp|image|video/g.test(mime)) {
      if (/video/.test(mime) && (q.msg || q).seconds > 15) {
        return m.reply('⏳ 𝐄𝐥 𝐯𝐢𝐝𝐞𝐨 𝐧𝐨 𝐩𝐮𝐞𝐝𝐞 𝐬𝐮𝐩𝐞𝐫𝐚𝐫 𝐥𝐨𝐬 𝟏𝟓 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬. 𝐈𝐧𝐭𝐞𝐧𝐭𝐚 𝐜𝐨𝐧 𝐚𝐥𝐠𝐨 𝐦𝐚́𝐬 𝐜𝐨𝐫𝐭𝐨.')
      }

      const media = await q.download?.()
      if (!media) {
        return m.reply('🌨️ 𝐀𝐮́𝐧 𝐧𝐨 𝐡𝐞 𝐩𝐨𝐝𝐢𝐝𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐫 𝐭𝐮 𝐬𝐭𝐢𝐜𝐤𝐞𝐫. 𝐈𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐜𝐨𝐧 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐨 𝐯𝐢𝐝𝐞𝐨.')
      }

      let out
      const userData = global.db.data.users[m.sender] || {}
      const texto1 = userData.text1 || global.packsticker
      const texto2 = userData.text2 || global.packsticker2

      try {
        stiker = await sticker(media, false, texto1, texto2)
      } finally {
        if (!stiker) {
          if (/webp/.test(mime)) out = await webp2png(media)
          else if (/image/.test(mime)) out = await uploadImage(media)
          else if (/video/.test(mime)) out = await uploadFile(media)
          if (typeof out !== 'string') out = await uploadImage(media)
          stiker = await sticker(false, out, texto1, texto2)
        }
      }

    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], texto1, texto2)
      } else {
        return m.reply('🔗 El enlace no parece válido. Asegúrate de que termine en .jpg, .png o .gif.')
      }
    }
  } catch (e) {
    console.error(e)
  } finally {
    if (stiker) {
      await conn.sendMessage(m.chat, {
        text: '🖼️ Tu sticker está listo ✨',
        footer: '✨ Generado con estilo personalizado',
        contextInfo: {
          externalAdReply: {
            title: 'Sticker convertido',
            body: 'Vista previa de la imagen base',
            thumbnailUrl: thumbnailCard,
            sourceUrl: args[0] || thumbnailCard
          }
        }
      }, { quoted: m })

      await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    } else {
      await conn.sendMessage(m.chat, {
        text: '‼️ 𝐀𝐮́𝐧 𝐧𝐨 𝐡𝐞 𝐩𝐨𝐝𝐢𝐝𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐫 𝐭𝐮 𝐬𝐭𝐢𝐜𝐤𝐞𝐫. 𝐈𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞 𝐜𝐨𝐧 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐨 𝐯𝐢𝐝𝐞𝐨.'
        footer: '🌟 Generador automático de stickers',
        contextInfo: {
          externalAdReply: {
            title: 'No se pudo generar el sticker',
            body: 'Envíame una imagen o video para convertir',
            thumbnailUrl: thumbnailCard,
            sourceUrl: thumbnailCard
          }
        }
      }, { quoted: m })
    }
  }
}

handler.help = ['sticker <imagen|url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text = '') => {
  const regex = /^https?:\/\/[^ ]+\.(jpe?g|png|gif)$/i
  return regex.test(text)
}
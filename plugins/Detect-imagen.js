import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  const thumbnailCard = 'https://i.imgur.com/VkC6Aql.jpeg'
  const apiEndpoint = 'https://delirius-apiofc.vercel.app/ia/checkaesthetic?image='
  let imageUrl = args[0]

  if (!imageUrl && !m.quoted?.mimetype?.includes('image')) {
    await conn.sendMessage(m.chat, {
      text: `📷 *Envía una imagen o escribe una URL para analizar estética.*\nEjemplo:\n${usedPrefix + command} https://i.ibb.co/ZcPLKgK/darlyn-profile-programacion.jpg`,
      footer: '✨ Evaluación vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: 'Aesthetic Score Analyzer',
          body: 'Descubre qué tan llamativa es tu foto',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://delirius-apiofc.vercel.app'
        }
      }
    }, { quoted: m })
    return
  }

  try {
    if (!imageUrl && m.quoted?.mimetype.includes('image')) {
      const buffer = await m.quoted.download()
      const { default: uploadImage } = await import('../lib/uploadImage.js')
      imageUrl = await uploadImage(buffer)
    }

    const res = await fetch(`${apiEndpoint}${encodeURIComponent(imageUrl)}`)
    const json = await res.json()
    const result = json?.data

    if (!json?.status || !result?.score) {
      return m.reply('❌ No se pudo analizar la imagen.')
    }

    const caption = `
✨ *Aesthetic Score Report*
📸 Evaluando estética de imagen...

📊 *Puntuación:* ${result.score} / 10
📈 *Comparación promedio:* ${result.comparation}
📝 *Comentario:* ${result.rating}`

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption,
      footer: '🧠 Análisis vía Delirius API',
      contextInfo: {
        externalAdReply: {
          title: `Estética: ${result.score}/10`,
          body: result.rating,
          thumbnailUrl: imageUrl,
          sourceUrl: imageUrl
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error('⚠️ Error en el plugin Aesthetic:', e)
    await m.reply(`❌ No se pudo procesar la imagen.\n📛 ${e.message}`)
  }
}

handler.command = ['aesthetic', 'score', 'checkbeauty']
export default handler
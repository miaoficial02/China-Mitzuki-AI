import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn }) => {
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, '🖼️ Responde a una imagen o video para analizar.', m)

  await m.react('⏳')

  try {
    let media = await q.download()
    let isImage = /image\/(png|jpe?g|gif)/.test(mime)
    let link = await (isImage ? uploadImage : uploadFile)(media)
    if (!link) throw new Error('No se pudo generar el enlace.')

    let short = await shortUrl(link)
    let buffer = await (await fetch(link)).buffer()

    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/checknsfw?image=${encodeURIComponent(link)}`)
    const json = await res.json()
    const result = json?.data
    if (!json?.status || typeof result?.NSFW !== 'boolean') {
      return m.reply('No se pudo analizar la imagen.')
    }

    let icon = result.NSFW ? '⚠️' : '✅'
    let estado = result.NSFW ? 'NSFW detectado' : 'Imagen segura'

    let txt = `
${icon} ${estado}
🔗 ${short}
📦 ${formatBytes(media.length)}
📊 Probabilidad: ${result.percentage}
🔒 Seguro: ${result.safe ? 'Sí' : 'No'}
📝 ${result.response}`

    await conn.sendFile(m.chat, buffer, 'imagen.jpg', txt, m)
    await m.react('✅')

  } catch (e) {
    console.error('⛔ Error en el análisis NSFW:', e)
    await m.reply(`Error al analizar la imagen.\n${e.message}`)
    await m.react('❌')
  }
}

handler.command = ['nsfwcheck', 'analizar']
export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
  return await res.text()
}
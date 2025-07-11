import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn }) => {
  if (!m.isGroup || !(m.mimetype || '').includes('image')) return

  try {
    const media = await m.download()
    const isImage = /image\/(png|jpe?g|gif)/.test(m.mimetype)
    const link = await (isImage ? uploadImage : uploadFile)(media)
    if (!link) return

    const scan = await fetch(`https://delirius-apiofc.vercel.app/tools/checknsfw?image=${encodeURIComponent(link)}`)
    const json = await scan.json()
    const result = json?.data

    if (!json?.status || typeof result?.NSFW !== 'boolean') return

    if (result.NSFW) {
      const sender = m.sender
      const nombre = await conn.getName(sender)
      const groupMetadata = await conn.groupMetadata(m.chat)
      const bot = groupMetadata.participants.find(p => p.id === conn.user.jid)
      const isBotAdmin = bot?.admin || bot?.admin === 'superadmin'

      if (isBotAdmin) {
        await m.reply(
`⚠️ *Contenido NSFW detectado.*

Probabilidad: ${result.percentage}
El usuario *${nombre}* ha violado las reglas.

🚫 Se procederá a su eliminación del grupo.`)

        await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
      } else {
        await m.reply(
`⚠️ *Contenido NSFW detectado.*

Probabilidad: ${result.percentage}
El usuario *${nombre}* ha violado las reglas, pero no tengo permisos de administrador para actuar.`)
      }
    }
  } catch (e) {
    console.error('⛔ Error moderando imagen NSFW:', e)
  }
}

// SIN comando — activa automáticamente ante imágenes
handler.customPrefix = /^$/
handler.before = handler
handler.group = true

export default handler
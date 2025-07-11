import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn }) => {
  // Solo aplica en grupos y si el mensaje contiene una imagen
  if (!m.isGroup || !(m.mimetype || '').includes('image')) return

  try {
    // Convertir imagen a enlace
    const media = await m.download()
    const isImage = /image\/(png|jpe?g|gif)/.test(m.mimetype)
    const link = await (isImage ? uploadImage : uploadFile)(media)

    if (!link) return

    // Enviar a Delirius API
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/checknsfw?image=${encodeURIComponent(link)}`)
    const json = await res.json()
    const result = json?.data

    if (!json?.status || typeof result?.NSFW !== 'boolean') return

    if (result.NSFW) {
      const sender = m.sender
      const groupMetadata = await conn.groupMetadata(m.chat)
      const bot = groupMetadata.participants.find(p => p.id === conn.user.jid)
      const isBotAdmin = bot?.admin || bot?.admin === 'superadmin'

      const nombre = await conn.getName(sender)

      if (isBotAdmin) {
        await m.reply(
`⚠️ Imagen no permitida.

🔎 Detectado contenido NSFW con una probabilidad de ${result.percentage}.
📛 El usuario *${nombre}* será eliminado por violar las normas.`)

        await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
      } else {
        await m.reply(
`⚠️ Imagen inapropiada detectada.

🔎 Probabilidad NSFW: ${result.percentage}
❌ *${nombre}* ha incumplido las reglas del grupo, pero no tengo permisos para expulsar.`)
      }
    }
  } catch (e) {
    console.error('Error en moderación automática NSFW:', e)
  }
}

export default handler
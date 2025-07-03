import fetch from 'node-fetch'

const NSFW_API = 'https://clearsai.vercel.app/api/nsfw' // API pública sin token

let handler = async (m, { conn }) => {
  if (!m.isGroup || !m.msg || !m.msg.fileSha256 || !m.mimetype?.startsWith('image/')) return

  const chat = global.db.data.chats[m.chat]
  if (!chat?.nsfwScan) return // Solo si está activado en la config del grupo

  const groupMetadata = await conn.groupMetadata(m.chat)
  const botNumber = conn.user.jid
  const botAdmin = groupMetadata.participants.find(p => p.id === botNumber && p.admin)

  try {
    const buffer = await m.download()
    const res = await fetch(NSFW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: buffer
    })

    const json = await res.json()
    const resultado = json?.resultado || ''
    const score = json?.score || 0

    if (resultado === 'nsfw' && score >= 0.85) {
      if (botAdmin) {
        await conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key } })
        await conn.sendMessage(m.chat, { delete: m.key })
        await conn.sendMessage(m.chat, {
          text: `⚠️ Imagen eliminada por contenido NSFW.\nUsuario: @${m.sender.split('@')[0]}`,
          mentions: [m.sender]
        })
      } else {
        await conn.reply(m.chat, `⚠️ *Contenido NSFW detectado*, pero no tengo permisos para eliminar el mensaje.`, m)
      }
    }
  } catch (e) {
    console.error('[NSFW-SCAN]', e)
  }
}

handler.customPrefix = /^.*$/ // Escucha todo
handler.command = new RegExp // No requiere comando
handler.group = true
handler.register = true

export default handler

import fetch from 'node-fetch'
import FormData from 'form-data'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`📝 *Uso correcto:* ${usedPrefix}${command} [texto]\n\nEjemplo:\n${usedPrefix}${command} Hola equipo, jugamos Free Fire a las 8pm.`)
  }

  const texto = args.join(' ')
  const apiKey = 

  m.react('❄️')

  try {
    
    const res = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        script: {
          type: 'text',
          subtitles: false,
          provider: { type: 'microsoft', voice_id: 'es-CO-GonzaloNeural' }, // Voz en español colombiano
          ssml: false,
          input: texto
        },
        source_url: 'https://studio.d-id.com/avatars/amy-pp.png' // Avatar predeterminado
      })
    })

    if (!res.ok) throw await res.text()
    const data = await res.json()

    const id = data.id

    
    let videoUrl = ''
    for (let i = 0; i < 30; i++) {
      const check = await fetch(`https://api.d-id.com/talks/${id}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      })
      const json = await check.json()
      if (json.result_url) {
        videoUrl = json.result_url
        break
      }
      await new Promise(r => setTimeout(r, 2000))
    }

    if (!videoUrl) throw '⏳ No se pudo generar el video a tiempo.'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `✅ *Video generado por IA:*\n🗣️ "${texto}"`,
      gifPlayback: false
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply(`❌ Error al generar el video.\n${e}`)
  }
}

handler.command = ['iahabla']
handler.help = ['iahabla texto']
handler.tags = ['ia']

export default handler
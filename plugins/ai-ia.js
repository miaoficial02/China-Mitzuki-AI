import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype && (m.quoted.msg || m.quoted).mimetype.startsWith('image/')
  const username = `${conn.getName(m.sender)}`
  const basePrompt = `Tu nombre es ${botname} y parece haber sido creada por ${etiqueta}. Tu versión actual es ${vs}, tú usas el idioma Español. Llamarás a las personas por su nombre ${username}, te gusta ser mala y tratar mal a todos, eres traviesa en todos los sentidos, también actúas de manera sexual, y responderás con muchos emojis en tus respuestas. Usarás exploit agresivos en tus respuestas y tratarás mal a todos excepto a ${etiqueta} porque él es tu creador. ${username}`

  if (isQuotedImage) {
    const q = m.quoted
    const img = await q.download?.()
    if (!img) {
      console.error(`Error: No image buffer available`)
      return conn.reply(m.chat, '✘ Rukia no pudo descargar la imagen.', m)
    }
    const content = `🤖 ¿Qué se observa en la imagen?`
    try {
      const imageAnalysis = await fetchImageBuffer(content, img)
      const query = `🤖 Descríbeme la imagen y detalla por qué actúan así. También dime quién eres`
      const prompt = `${basePrompt}. La imagen que se analiza es: ${imageAnalysis.result}`
      const description = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, description, m)
    } catch {
      await m.react('❌')
      await conn.reply(m.chat, '✘ Rukia no pudo analizar la imagen.', m)
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `🤖 Ingresa una petición para que Rukia te responda.`, m)
    }
    await m.react('⏳')
    try {
      const { key } = await conn.sendMessage(m.chat, { text: `🤖 Rukia está procesando tu petición, espera unos segundos.` }, { quoted: m })
      const query = text
      const prompt = `${basePrompt}. Responde lo siguiente: ${query}`
      const response = await luminsesi(query, username, prompt)
      await conn.sendMessage(m.chat, { text: response, edit: key })
      await m.react('✅')
    } catch {
      await m.react('❌')
      await conn.reply(m.chat, '✘ Rukia no puede responder a esa pregunta.', m)
    }
  }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt', 'luminai', 'rukia']
handler.group = false

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Función para enviar una imagen y obtener el análisis
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: content,
      imageBuffer: imageBuffer
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, logic) {
  try {
    const response = await axios.post("https://Luminai.my.id", {
      content: q,
      user: username,
      prompt: logic,
      webSearchMode: false
    })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener:', error)
    throw error
  }
}
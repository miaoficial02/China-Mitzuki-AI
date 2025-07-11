import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const thumbnailCard = 'https://qu.ax/phgPU.jpg'
  const apiUrl = 'https://api.diioffc.web.id/api/ai/bard?query='

  if (!text) {
    await conn.sendMessage(m.chat, {
      text: `💬 Escribe una pregunta para que Bard AI la responda.\n\nEjemplo:\n${usedPrefix + command} ¿Qué es el protocolo TCP/IP?`,
      footer: '🧠 Bard AI por DiiOffc',
      contextInfo: {
        externalAdReply: {
          title: 'Generador Bard AI',
          body: 'Obtén respuestas instantáneas a tus preguntas',
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.diioffc.web.id'
        }
      }
    }, { quoted: m })
    return
  }

  try {
    const res = await fetch(`${apiUrl}${encodeURIComponent(text)}`)
    const json = await res.json()
    const answer = json?.result || json?.data?.result || json?.data

    if (!json?.status || typeof answer !== 'string') {
      await conn.sendMessage(m.chat, {
        text: `❌ No se pudo procesar la solicitud.\n📛 ${json?.message || 'Respuesta no disponible'}`,
        footer: '⚠️ Bard AI por DiiOffc',
        contextInfo: {
          externalAdReply: {
            title: 'Error al consultar Bard',
            body: json?.message || 'Petición no válida',
            thumbnailUrl: thumbnailCard,
            sourceUrl: 'https://api.diioffc.web.id'
          }
        }
      }, { quoted: m })
      return
    }

    await conn.sendMessage(m.chat, {
      text: `🧠 *Respuesta de Bard AI:*\n\n${answer}`,
      footer: '📡 Generado vía DiiOffc',
      contextInfo: {
        externalAdReply: {
          title: 'Bard AI',
          body: text.slice(0, 60),
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.diioffc.web.id'
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error('💥 Error en el plugin Bard:', e)
    await conn.sendMessage(m.chat, {
      text: `❌ Error interno al consultar Bard.\n📛 ${e.message}`,
      footer: '🔧 Bard AI por DiiOffc',
      contextInfo: {
        externalAdReply: {
          title: 'Error interno',
          body: e.message,
          thumbnailUrl: thumbnailCard,
          sourceUrl: 'https://api.diioffc.web.id'
        }
      }
    }, { quoted: m })
  }
}

handler.command = ['bard', 'iarespuesta', 'preguntarbard']
export default handler
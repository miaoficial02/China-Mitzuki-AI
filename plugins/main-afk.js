export function before(m) {
  if (m.fromMe) return true // 🛡️ Ignorar mensajes del propio bot

  const user = global.db.data.users[m.sender]

  // 🎖️ Retorno de un agente del modo AFK
  if (user.afk > -1) {
    conn.reply(
      m.chat,
      `🛰️ *Centro de Mando - Reintegración de Unidad Confirmada*

🎖️ *Operativo:* ${conn.getName ? conn.getName(m.sender) : m.sender.split('@')[0]}
📦 *Motivo de Inactividad:* ${user.afkReason || 'Sin registrar.'}
⏱️ *Duración del retiro táctico:* ${msToReadableTime(new Date() - user.afk)}

✅ *Estado actualizado con éxito.*
🧠 *Shizuka confirma que el agente ha vuelto al frente operativo.*`,
      m
    )
    user.afk = -1
    user.afkReason = ''
  }

  // 🔎 Escaneo de usuarios citados o mencionados
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (const jid of jids) {
    if (jid === conn.user.jid) continue // 🚫 Ignorar al propio bot

    const target = global.db.data.users[jid]
    if (!target || target.afk < 0) continue

    const reason = target.afkReason || 'Sin detalles proporcionados.'
    const tiempo = msToReadableTime(new Date() - target.afk)

    conn.reply(
      m.chat,
      `🚨 *Alerta Operativa - Contacto Inactivo Detectado*

👤 *Agente identificado:* @${jid.split('@')[0]}
🛌 *Estado actual:* AFK (Fuera de línea)
📋 *Último reporte:* ${reason}
⏱️ *Tiempo ausente:* ${tiempo}

📡 *Recomendación táctica:* Evitar distracciones innecesarias al agente mientras se encuentra desconectado.

*~ Shizuka, en vigilancia constante...*`,
      m,
      { mentions: [jid] }
    )
  }

  return true
}

// 🕒 Convertidor de milisegundos a formato legible
function msToReadableTime(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
export function before(m) {
  // 🛡️ Ignorar mensajes propios del bot
  if (m.fromMe) return true

  const user = global.db.data.users[m.sender]

  // 🧠 Shizuka detecta retorno del AFK
  if (user.afk > -1) {
    conn.reply(
      m.chat,
      `🎖️ *¡Bienvenido de regreso, agente!* 

📌 *Motivo de inactividad:* ${user.afkReason || 'No especificado'}
⏱️ *Duración del retiro táctico:* ${msToReadableTime(new Date() - user.afk)}

📡 Estado actualizado. Unidad reactivada.`,
      m
    )
    user.afk = -1
    user.afkReason = ''
  }

  // 🔍 Escaneo de menciones a usuarios en estado AFK
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (const jid of jids) {
    if (jid === conn.user.jid) continue

    const target = global.db.data.users[jid]
    if (!target || target.afk < 0) continue

    const reason = target.afkReason || 'Sin informe registrado.'
    const tiempo = msToReadableTime(new Date() - target.afk)

    conn.reply(
      m.chat,
      `📡 *Unidad táctica Shizuka: Alerta de usuario inactivo* 

👤 *Objetivo mencionado:* @${jid.split('@')[0]}
💤 *Estado:* AFK (fuera de operaciones)
📋 *Motivo:* ${reason}
⏱️ *Tiempo fuera:* ${tiempo}

🚫 *Recomendación:* No interrumpir al operativo en descanso estratégico.`,
      m,
      { mentions: [jid] }
    )
  }

  return true
}

// 🕒 Convertidor de tiempo legible
function msToReadableTime(ms) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor(ms / 60000) % 60
  const s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
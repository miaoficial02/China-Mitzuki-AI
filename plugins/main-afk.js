export function before(m) {
  const user = global.db.data.users[m.sender]

  // Si el usuario estaba AFK, notificar que ha regresado
  if (user.afk > -1) {
    conn.reply(
      m.chat,
      `🛰️ *Registro actualizado: Has vuelto del estado inactivo.*\n` +
      `${user.afkReason ? `📌 *Motivo anterior:* ${user.afkReason}\n` : ''}` +
      `⏳ *Tiempo ausente:* ${msToReadableTime(new Date() - user.afk)}`,
      m
    )
    user.afk = -1
    user.afkReason = ''
  }

  // Detectar menciones o citas de usuarios AFK
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (const jid of jids) {
    const target = global.db.data.users[jid]
    if (!target) continue

    if (target.afk && target.afk > -1) {
      const reason = target.afkReason || 'Sin motivo registrado.'
      const tiempo = msToReadableTime(new Date() - target.afk)
      conn.reply(
        m.chat,
        `📡 *Sistema Shizuka: Contacto inactivo detectado.*\n` +
        `👤 *@${jid.split('@')[0]}* está en estado AFK.\n` +
        `📋 *Motivo:* ${reason}\n` +
        `⏱️ *Tiempo fuera:* ${tiempo}`,
        m,
        { mentions: [jid] }
      )
    }
  }

  return true
}

// Función para formatear tiempo de forma legible
function msToReadableTime(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
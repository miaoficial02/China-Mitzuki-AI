export function before(m) {
  // Ignorar si el mensaje proviene del propio bot
  if (m.fromMe) return true

  const user = global.db.data.users[m.sender]

  // Si el usuario estaba AFK, notificar retorno
  if (user.afk > -1) {
    conn.reply(
      m.chat,
      `🛰️ *Has salido del estado AFK.*\n` +
      `${user.afkReason ? `📋 *Motivo anterior:* ${user.afkReason}\n` : ''}` +
      `⏱️ *Tiempo fuera:* ${msToReadableTime(new Date() - user.afk)}`,
      m
    )
    user.afk = -1
    user.afkReason = ''
  }

  // Revisar menciones y citas que NO sean del bot
  const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (const jid of jids) {
    // Ignorar si el mencionado es el propio bot
    if (jid === conn.user.jid) continue

    const target = global.db.data.users[jid]
    if (!target || target.afk < 0) continue

    const reason = target.afkReason || 'Sin motivo registrado'
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

  return true
}

// Formatea milisegundos a hh mm ss
function msToReadableTime(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return `${h}h ${m}m ${s}s`
}
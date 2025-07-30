// plugins/solo-oficial-grupo.js

let handler = async (m, { conn }) => {
  if (!m.isGroup) return !1 // Solo aplica en grupos

  // 📌 Número oficial del BOT
  const OFFICIAL_NUMBER = "18097769423@s.whatsapp.net" // <-- cámbialo por el tuyo

  // 📌 ID del grupo permitido
  const OFFICIAL_GROUP = "120363419244550510@g.us" // <-- cámbialo por el ID de tu grupo

  // Obtenemos el número del bot conectado
  let botNumber = conn.user.id.split(':')[0].replace(/[^0-9]/g, '')

  // Si NO es el oficial o NO es el grupo permitido → no responde
  if (botNumber !== OFFICIAL_NUMBER || m.chat !== OFFICIAL_GROUP) {
    console.log("⛔ Sub-bot o grupo no autorizado, no responderá.")
    return !1
  }

  // ✅ SOLO responde si es el BOT OFICIAL en el GRUPO PERMITIDO
  if (/^hola$/i.test(m.text)) {
    await conn.reply(m.chat, "Hola 👋 soy el bot oficial ✅", m)
  }
}

handler.customPrefix = /.*/i
handler.command = new RegExp

export default handler
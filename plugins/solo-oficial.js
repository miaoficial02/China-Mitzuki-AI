// plugins/solo-oficial-grupo.js

let handler = async (m, { conn }) => {
  if (!m.isGroup) return !1 // Solo aplica en grupos

  // 📌 ID del BOT OFICIAL
  const OFFICIAL_BOT_ID = "18097769423@s.whatsapp.net" // <-- tu número oficial con @s.whatsapp.net

  // 📌 ID del GRUPO PERMITIDO
  const OFFICIAL_GROUP_ID = "120363419244550510@g.us" // <-- ID de tu grupo oficial

  // 🔑 Verificación: si NO es el BOT OFICIAL o NO está en el GRUPO OFICIAL → no responde
  if (
    conn.user.id.split(':')[0] !== OFFICIAL_BOT_ID.split(':')[0] ||
    m.chat !== OFFICIAL_GROUP_ID
  ) {
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
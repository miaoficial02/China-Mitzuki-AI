// plugins/solo-oficial.js

let handler = async (m, { conn }) => {
  if (!m.isGroup) return !1 // Solo aplica en grupos

  // 📌 Número oficial (sin +, solo código de país y número)
  const OFFICIAL_NUMBER = "18097769423" // <-- cámbialo por el tuyo

  // 🔑 Obtenemos el número del bot conectado
  let botNumber = conn.user.id.split(':')[0].replace(/[^0-9]/g, '')

  if (botNumber !== OFFICIAL_NUMBER) {
    console.log("⛔ Sub-bot detectado en grupo, no responderá.")
    return !1 // Detiene la ejecución, el sub-bot no responde
  }

  // ✅ Aquí solo responde el BOT OFICIAL
  if (/^hola$/i.test(m.text)) {
    await conn.reply(m.chat, "Hola 👋 soy el bot oficial ✅", m)
  }
}

handler.customPrefix = /.*/i
handler.command = new RegExp

export default handler
// plugins/solo-oficial.js

let handler = async (m, { conn }) => {
  // ⚡ Solo aplicar en grupos
  if (!m.isGroup) return !1;

  // 📌 ID del BOT OFICIAL
  const OFFICIAL_BOT_ID = "18097769423@s.whatsapp.net"; 
  // 🔴 Reemplaza con el número de tu bot oficial en formato internacional

  // ❌ Si no es el oficial, no responde
  if (conn.user.id !== OFFICIAL_BOT_ID) {
    console.log("⛔ Sub-bot detectado en grupo, no responderá.");
    return !1;
  }

  // ✅ Aquí responden SOLO los mensajes del bot oficial
  if (/^hola$/i.test(m.text)) {
    await conn.reply(m.chat, "Hola 👋 soy el bot oficial ✅", m);
  }
}

handler.customPrefix = /.*/i // Escucha todo
handler.command = new RegExp // Requerido en MD

export default handler;
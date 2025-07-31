import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para hablar con Rukia IA. Ejemplo:\n.rukia Hola");

  await m.reply("⏳ Rukia está pensando...");

  try {
    // Petición a la nueva API Mode-IA
    const res = await axios.get(`https://mode-ia.onrender.com/mode-ia?prompt=${encodeURIComponent(text)}`);
    
    const respuesta = res.data.result || "No pude responder.";

    await conn.sendMessage(
      m.chat,
      { text: `❄️ *Rukia*: ${respuesta}\n\n𝗜𝗔 𝗕𝘆 𝗘𝗿𝗲𝗻𝘅𝘇𝘆🥷🏻✨` },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con Rukia IA (Mode-IA).");
  }
};

handler.command = ["rukia", "iaxzy"];
export default handler;
import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para hablar con Rukia (Simsimi). Ejemplo:\n.rukia Hola");

  await m.reply("⏳ Rukia está pensando...");

  try {
    const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=es`);
    const respuesta = res.data.success || "No pude responder.";

    await conn.sendMessage(
      m.chat, 
      { text: respuesta + "\n\n🤖 IA Rukia By Erenxszy 🥷🏽✨" }, 
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con Simsimi.");
  }
};

handler.command = ["rukia", "iaxzy"];
handler.help = ["rukia <texto>", "iaxzy <texto>"];
handler.tags = ["ia"];

export default handler;
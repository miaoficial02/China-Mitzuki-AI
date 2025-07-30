import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para la IA.");

  await m.reply("⏳ Pensando...");

  try {
    const res = await axios.get(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(text)}`);
    const respuesta = res.data.response || "No pude responder.";

    await conn.sendMessage(m.chat, { text: respuesta + "\n\n🤖 IA By Erenxszy 🥷🏽✨" }, { quoted: m });
  } catch {
    m.reply("❌ Error con el chatbot.");
  }
};

handler.command = ["iaxzy"];
export default handler;
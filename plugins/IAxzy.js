import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para que la IA responda.");

  await m.reply("⏳ Pensando...");

  try {
    const res = await axios.get(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(text)}&botname=Rukia&ownername=Erenxszy&user=${m.sender.split('@')[0]}`);
    const respuesta = res.data.message || "No pude responder.";

    await conn.sendMessage(m.chat, { text: respuesta + "\n\n🤖 IA By Erenxszy 🥷🏽✨" }, { quoted: m });
  } catch (e) {
    console.error("Error chatbot alternativa:", e);
    m.reply("❌ Error con el chatbot alternativo.");
  }
};

handler.command = ["iaxzy"];
handler.help = ["iaxzy <texto>"];
handler.tags = ["ia"];

export default handler;
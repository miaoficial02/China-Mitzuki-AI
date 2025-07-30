import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para que la IA responda. Ejemplo:\n.iaxzy Hola");

  await m.reply("⏳ Pensando...");

  try {
    const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(text)}&lc=es`);
    const respuesta = res.data.success || "No pude responder.";

    await conn.sendMessage(m.chat, { text: respuesta + "\n\n𝗜𝗔 𝗕𝘆 𝗘𝗿𝗲𝗻𝘅𝘇𝘆 🥷🏽✨" }, { quoted: m });
  } catch (e) {
    console.error("Error Simsimi:", e);
    m.reply("❌ Error con Simsimi.");
  }
};

handler.command = ["iaxzy"];
handler.help = ["iaxzy <texto>"];
handler.tags = ["ia"];

export default handler;
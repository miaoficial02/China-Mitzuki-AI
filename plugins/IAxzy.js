import { ChatGPTUnofficialProxyAPI } from "gpt4free";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para la IA.");

  await m.reply("⏳ Pensando...");

  try {
    const api = new ChatGPTUnofficialProxyAPI();
    const res = await api.sendMessage(text);
    const respuesta = res.text || "No pude responder.";

    await conn.sendMessage(m.chat, { text: respuesta + "\n\n🤖 IA By Erenxszy 🥷🏽✨" }, { quoted: m });
  } catch (e) {
    m.reply("❌ Error con GPT4Free.");
  }
};

handler.command = ["iaxzy"];
export default handler;
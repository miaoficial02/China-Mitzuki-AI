import 'dotenv/config'   // 🔹 esto carga tu archivo .env automáticamente
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "TU_API_KEY_AQUI", // usa la clave del .env o la escrita
});

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Debes escribir algo. Ejemplo:\n.IAxzy Cuéntame un chiste");

  await m.reply("⏳ Espera un momento, estoy pensando...");

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: text }],
    });

    let respuesta = res.choices[0].message.content.trim();

    // Firma personalizada
    respuesta += `\n\n━━━━━━━━━━━━━━━\n🤖 IA By Erenxszy 🥷🏽✨`;

    await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con ChatGPT.");
  }
};

handler.command = ["iaxzy"];
handler.help = ["iaxzy <texto>"];
handler.tags = ["ia"];

export default handler;
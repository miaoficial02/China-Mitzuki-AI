import fetch from "node-fetch";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para que la IA responda. Ejemplo:\n.IAxzy Hola");

  await m.reply("⏳ Pensando...");

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: text }),
    });

    const data = await response.json();
    let respuesta = data[0]?.generated_text || "No pude responder.";

    respuesta += `\n\n━━━━━━━━━━━━━━━\n🤖 IA By Erenxszy 🥷🏽✨`;

    await conn.sendMessage(m.chat, { text: respuesta }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con la IA de Hugging Face.");
  }
};

handler.command = ["iaxzy"];
handler.help = ["iaxzy <texto>"];
handler.tags = ["ia"];

export default handler;
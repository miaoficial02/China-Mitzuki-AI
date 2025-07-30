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
    console.log("Respuesta API HuggingFace:", JSON.stringify(data, null, 2));

    let respuesta = "No pude responder.";
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      respuesta = data[0].generated_text;
    } else if (data.generated_text) {
      respuesta = data.generated_text;
    } else if (typeof data === "string") {
      respuesta = data;
    } else if (data.error) {
      respuesta = "Error: " + data.error;
    }

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
import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Escribe algo para hablar con Rukia IA. Ejemplo:\n.rukia Hola");

  await m.reply("⏳ Rukia está pensando...");

  try {
    const res = await axios.get(`https://delirius-apiofc.vercel.app/tools/simi?text=${encodeURIComponent(text)}`);
    const respuesta = res.data.data.message || "No pude responder.";

    await conn.sendMessage(
      m.chat,
      { text: `🌸 *Rukia*: ${respuesta}\n\n🤖 Creada por Erenxszy 🥷🏽✨` },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con Rukia IA (proxy).");
  }
};

handler.command = ["rukia", "iaxzy"];
export default handler;
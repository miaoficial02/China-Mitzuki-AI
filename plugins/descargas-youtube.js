import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("✦ Debes enviar el enlace de YouTube.\nEjemplo: *.xzytmp4 https://youtu.be/ID*");

  await m.reply("⏳ Descargando tu video, espera un momento...");

  try {
    const res = await axios.get(`https://mode-api-sigma.vercel.app/api/mp4?url=${encodeURIComponent(text)}`);
    
    if (!res.data || !res.data.result) {
      return m.reply("❌ No se pudo descargar el video.");
    }

    const { title, url } = res.data.result;

    await conn.sendMessage(
      m.chat,
      {
        document: { url },
        mimetype: "video/mp4",
        fileName: `${title}.mp4`,
        caption: `✅ *Video Descargado con Éxito*\n\n🎬 *Título:* ${title}\n🔗 *Enlace:* ${text}\n\n𝗕𝘆 Rukia-Bot ❄️`
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al conectar con la API de descargas.");
  }
};

handler.command = ["xzytmp4"];
export default handler;
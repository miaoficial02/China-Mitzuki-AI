import fs from "fs";
import path from "path";

const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const senderId = msg.key.participant || msg.key.remoteJid;
  const isGroup = chatId.endsWith("@g.us");

  if (!isGroup) {
    await conn.sendMessage(chatId, {
      text: "❌ Este comando solo puede usarse en grupos."
    }, { quoted: msg });
    return;
  }

  const conteoPath = path.resolve("./conteo.json");
  if (!fs.existsSync(conteoPath)) {
    await conn.sendMessage(chatId, {
      text: "⚠️ No hay datos de mensajes todavía en este grupo."
    }, { quoted: msg });
    return;
  }

  const conteoData = JSON.parse(fs.readFileSync(conteoPath, "utf-8"));
  const groupData = conteoData[chatId];

  if (!groupData) {
    await conn.sendMessage(chatId, {
      text: "⚠️ No hay datos de mensajes todavía en este grupo."
    }, { quoted: msg });
    return;
  }

  const metadata = await conn.groupMetadata(chatId);
  const groupName = metadata.subject || "Grupo";

  const usuariosOrdenados = Object.entries(groupData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 30);

  if (usuariosOrdenados.length === 0) {
    await conn.sendMessage(chatId, {
      text: "⚠️ Aún no hay mensajes contados en este grupo."
    }, { quoted: msg });
    return;
  }

  let texto = `🏆 *Top de usuarios más activos en ${groupName}:*\n\n`;
  const menciones = [];

  for (let i = 0; i < usuariosOrdenados.length; i++) {
    const [userId, total] = usuariosOrdenados[i];
    const num = userId.split("@")[0];
    texto += `${i + 1}.- @${num} ➤ ${total} mensajes\n`;
    menciones.push(userId);
  }

  await conn.sendMessage(chatId, {
    text: texto,
    mentions: menciones
  }, { quoted: msg });
};

handler.command = ["totalmensaje"];
export default handler;
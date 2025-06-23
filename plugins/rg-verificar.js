import db from '../lib/database.js';
import { createHash } from 'crypto';
import { profilePictureUrl } from '@whiskeysockets/baileys'; // Ajusta según tu librería

// Expresión regular para validar formato: nombre.edad
const REGEX_FORMAT = /^([^.|]+)[.|]\s*(\d+)$/i;

let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Datos del usuario
  const user = db.data.users[m.sender];
  const name = conn.getName(m.sender);
  const pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => './src/avatar_contact.png');

  // Validar si ya está registrado
  if (user.registered) {
    return conn.reply(m.chat, 
      `❌ *Ya estás registrado.*\n\n¿Quieres eliminar tu registro? Usa:\n*${usedPrefix}unreg*`, 
      m
    );
  }

  // Validar formato del texto (nombre.edad)
  if (!REGEX_FORMAT.test(text)) {
    return conn.reply(m.chat,
      `⚠️ *Formato incorrecto.*\n\nUso: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name}.18*`,
      m
    );
  }

  // Extraer nombre y edad
  const [, inputName, inputAge] = text.match(REGEX_FORMAT);
  const age = parseInt(inputAge);

  // Validaciones
  if (!inputName.trim()) return conn.reply(m.chat, '❌ El nombre no puede estar vacío.', m);
  if (inputName.length > 30) return conn.reply(m.chat, '❌ El nombre es demasiado largo (máx. 30 caracteres).', m);
  if (isNaN(age)) return conn.reply(m.chat, '❌ La edad debe ser un número válido.', m);
  if (age > 100) return conn.reply(m.chat, '❌ Edad inválida (máx. 100 años).', m);
  if (age < 5) return conn.reply(m.chat, '❌ ¡Debes tener al menos 5 años para registrarte!', m);

  // Guardar datos
  user.name = inputName.trim();
  user.age = age;
  user.regTime = new Date();
  user.registered = true;

  // Recompensas
  user.coin += 40;
  user.exp += 300;
  user.joincount += 20;

  // Generar número de serie
  const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 8);

  // Mensaje de confirmación
  const regMessage = `
✨ *REGISTRO EXITOSO* ✨
• Nombre: ${user.name}
• Edad: ${user.age} años
• Fecha: ${user.regTime.toLocaleDateString()}
• ID: ${sn}

🎁 *Recompensas:*
- ⛁ ${user.coin} monedas
- ✨ ${user.exp} exp
- 🎟️ ${user.joincount} tokens
`.trim();

  // Enviar mensaje con anuncio embebido
  await conn.sendMessage(m.chat, {
    text: regMessage,
    contextInfo: {
      externalAdReply: {
        title: '✅ Registro completado',
        body: global.textbot || '¡Bienvenido/a!',
        thumbnail: await (await fetch(pp)).buffer(),
        mediaType: 1,
        sourceUrl: global.channel || 'https://whatsapp.com',
        showAdAttribution: true
      }
    }
  }, { quoted: m });

  await m.react('✅');
};

// Configuración del comando
handler.help = ['reg <nombre.edad>'];
handler.tags = ['register'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;

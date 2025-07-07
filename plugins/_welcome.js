import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true
  
  const fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net"
  }  
  
  // Configuración inicial
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/rnsuj.jpg')
  let img = await (await fetch(pp)).buffer()
  let chat = global.db.data.chats[m.chat]
  let groupSize = participants.length
  
  // Ajustar tamaño del grupo según evento
  m.messageStubType == 27 ? groupSize++ : 
  (m.messageStubType == 28 || m.messageStubType == 32) && groupSize--

  // Mensaje de BIENVENIDA (nuevo miembro)
  if (chat.welcome && m.messageStubType == 27) {
    const mention = m.messageStubParameters[0].split('@')[0]
    const bienvenida = `
☠️ *▄︻デ══━💀 @${mention}...*  
*Your data has been scanned. Welcome to the dark network*

${global.welcom1}

✦ Ahora son ${groupSize} presas
 *Sobrevivan mientras puedan!*
> Hoy caerá tu sangre 🩸`.trim()
    
    await conn.sendMini(
      m.chat, 
      'ﮩ٨ـﮩﮩ٨ــ𝙉𝙪𝙚𝙫𝙖 𝙑𝙞𝙘𝙩𝙞𝙢𝙖ﮩ٨ـﮩﮩ٨ــ',
      dev, 
      bienvenida, 
      img, 
      img, 
      redes, 
      fkontak
    )
  }

  // Mensaje de DESPEDIDA (miembro salió)
  if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32)) {
    const mention = m.messageStubParameters[0].split('@')[0]
    const bye = `
❀ *Adiós* de ${groupMetadata.subject}
✰ @${mention}

${global.welcom2}

✦ Ahora somos ${groupSize} miembros
•(=^●ω●^=)• *Te esperamos pronto!*
> Usa *${usedPrefix}help* para ver comandos`.trim()
    
    await conn.sendMini(
      m.chat, 
      'ゲ◜៹ Bye Member ៹◞ゲ',
      dev, 
      bye, 
      img, 
      img, 
      redes, 
      fkontak
    )
  }
}
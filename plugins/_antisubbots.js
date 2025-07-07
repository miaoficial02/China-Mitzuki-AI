import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
    if (!m.isGroup) return
    
    let chat = global.db.data.chats[m.chat]
    if (!chat.antiBot2) return

    const botJid = global.conn.user.jid // JID del bot principal
    if (botJid === conn.user.jid) return

    const isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id))
    if (!isBotPresent) return

    // Mensaje de despedida mejorado
    const farewellMessage = `
╔═══════════════╗
   ✦ 𝗗𝗘𝗦𝗣𝗘𝗗𝗜𝗗𝗔 𝗕𝗢𝗧 ✦
╚═══════════════╝

《✧》 *Motivo* 《✧》
"Este grupo contiene al bot principal,
por lo que me retiraré para evitar spam"

╔═══════════════╗
  ✦ 𝗚𝗥𝗔𝗖𝗜𝗔𝗦 𝗣𝗢𝗥 𝗟𝗔 𝗖𝗢𝗠𝗣𝗥𝗘𝗡𝗦𝗜𝗢𝗡 ✦
╚═══════════════╝`.trim()

    // Acciones con manejo de errores
    try {
        await conn.sendMessage(m.chat, { 
            text: farewellMessage,
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
        
        await new Promise(resolve => setTimeout(resolve, 3000)) // Espera 3 segundos
        await conn.groupLeave(m.chat)
        
    } catch (e) {
        console.error('Error en el proceso de salida:', e)
        await conn.sendMessage(m.chat, {
            text: 'Ocurrió un error al procesar mi salida. Contacta al administrador.'
        })
    }
}
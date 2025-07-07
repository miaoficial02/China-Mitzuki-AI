let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType || !m.isGroup) return
    
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
    
    let chat = global.db.data.chats[m.chat]
    if (!chat.detect) return
    
    let usuario = `@${m.sender.split('@')[0]}`
    let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    
    // Mensajes mejorados
    const messages = {
        21: `✨ *Cambio de Nombre* ✨\n\n▸ *Usuario*: ${usuario}\n▸ *Nuevo nombre*: ${m.messageStubParameters[0]}\n\n_El grupo ha sido renombrado_`,
        22: {
            image: { url: pp },
            caption: `🖼️ *Cambio de Imagen* 🖼️\n\n▸ *Usuario*: ${usuario}\n\n_Se ha actualizado la foto del grupo_`,
            mentions: [m.sender]
        },
        23: `🔗 *Enlace Actualizado* 🔗\n\n▸ *Usuario*: ${usuario}\n\n_El enlace del grupo ha sido restablecido_`,
        25: `⚙️ *Configuración Modificada* ⚙️\n\n▸ *Usuario*: ${usuario}\n▸ *Nuevo estado*: ${m.messageStubParameters[0] == 'on' ? 'Solo admins' : 'Todos'}\n\n_Permisos de edición actualizados_`,
        26: `🔒 *Estado del Grupo* 🔒\n\n▸ *Usuario*: ${usuario}\n▸ *Nuevo estado*: ${m.messageStubParameters[0] == 'on' ? 'Cerrado (solo admins)' : 'Abierto (todos)'}\n\n_Configuración de mensajes modificada_`,
        29: `👑 *Nuevo Administrador* 👑\n\n▸ *Usuario*: @${m.messageStubParameters[0].split('@')[0]}\n▸ *Promovido por*: ${usuario}\n\n_Felicidades por tu nueva posición_`,
        30: `⚡ *Administrador Removido* ⚡\n\n▸ *Usuario*: @${m.messageStubParameters[0].split('@')[0]}\n▸ *Removido por*: ${usuario}\n\n_Rol administrativo retirado_`
    }

    if (messages[m.messageStubType]) {
        let messageContent = messages[m.messageStubType]
        let mentions = [m.sender]
        
        if ([29, 30].includes(m.messageStubType)) {
            mentions.push(m.messageStubParameters[0])
        }
        
        await conn.sendMessage(m.chat, 
            typeof messageContent === 'string' 
                ? { text: messageContent, mentions } 
                : { ...messageContent, mentions },
            { quoted: fkontak }
        )
    } else if (m.messageStubType !== 2) {
        console.log({
            messageStubType: m.messageStubType,
            messageStubParameters: m.messageStubParameters,
            type: WAMessageStubType[m.messageStubType]
        })
    }
}

export default handler
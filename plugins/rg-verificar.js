import { createHash } from 'crypto'
import moment from 'moment-timezone'
moment.locale('es') // Configurar fechas en español

const handler = async (m, { conn, text, usedPrefix, command }) => {
    // Verificación básica
    if (!text) return m.reply(obtenerUso(usedPrefix, command, conn.getName(m.sender)))
    
    const usuario = global.db.data.users[m.sender]
    if (usuario.registrado) {
        return m.reply(`
⚠️ *YA ESTÁS REGISTRADO* ⚠️

¿Quieres eliminar tu registro?
Usa: *${usedPrefix}unreg*`)
    }

    // Procesar datos
    const coincidencia = text.match(/\|?(.*)([.|] *?)([0-9]*)$/i)
    if (!coincidencia) return m.reply(obtenerUso(usedPrefix, command, conn.getName(m.sender)))

    let [_, nombre, separador, edad] = coincidencia
    
    // Validaciones
    const errorValidacion = validarRegistro(nombre, edad)
    if (errorValidacion) return m.reply(errorValidacion)

    edad = parseInt(edad)
    
    // Registrar usuario
    registrarUsuario(usuario, nombre, edad)
    
    // Enviar confirmación al usuario
    await enviarConfirmacionUsuario(m, conn, usuario, nombre, edad)
    
    // Enviar notificación al canal
    await enviarNotificacionCanal(m, conn, usuario, nombre, edad)
}

// ... (funciones auxiliares anteriores permanecen iguales)

async function enviarNotificacionCanal(m, conn, usuario, nombre, edad) {
    const idCanal = '120363400241973967@newsletter' // ID de tu canal Newsletter
    const idHash = createHash('md5').update(m.sender).digest('hex').slice(0, 8)
    const fechaFormateada = moment(usuario.fechaRegistro).format('LL [a las] LT')
    
    const mensajeCanal = `
🔔 *NUEVO REGISTRO* 🔔

▢ *Usuario:* ${m.pushName || 'Anónimo'}
▢ *Nombre registrado:* ${nombre}
▢ *Edad:* ${edad} años
▢ *Fecha:* ${fechaFormateada}
▢ *ID de registro:* ${idHash}
▢ *Número:* ${m.sender.replace(/@s\.whatsapp\.net/, '')}`.trim()

    try {
        await conn.sendMessage(idCanal, {
            text: mensajeCanal,
            contextInfo: {
                externalAdReply: {
                    title: "📢 NUEVO USUARIO REGISTRADO",
                    body: '¡Bienvenido a nuestra comunidad!',
                    thumbnailUrl: 'https://qu.ax/YnWMn.jpg',
                    mediaType: 1,
                    showAdAttribution: false
                }
            }
        })
        console.log('Notificación enviada al canal exitosamente')
    } catch (error) {
        console.error('Error al enviar al canal:', error)
    }
}

// ... (export handler permanece igual)
import { createCanvas, loadImage, registerFont } from 'canvas'
import moment from 'moment-timezone'

export async function generarTarjeta({ nombre, numero, grupo, miembros, avatarUrl, fechaIngreso }) {
  const canvas = createCanvas(900, 500)
  const ctx = canvas.getContext('2d')

  // Fondo: imagen del usuario ampliada
  const fondo = await loadImage(avatarUrl)
  ctx.drawImage(fondo, 0, 0, 900, 500)

  // Capa oscura translúcida para contraste
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  ctx.fillRect(0, 0, 900, 500)

  // Texto informativo
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 40px Sans'
  ctx.fillText(`👋 Bienvenid@, ${nombre}`, 50, 120)

  ctx.font = '28px Sans'
  ctx.fillText(`📱 Número: +${numero}`, 50, 180)
  ctx.fillText(`🏷️ Grupo: ${grupo}`, 50, 230)
  ctx.fillText(`👥 Miembros: ${miembros}`, 50, 280)
  ctx.fillText(`🕓 Ingreso: ${fechaIngreso}`, 50, 330)

  return canvas.toBuffer()
}

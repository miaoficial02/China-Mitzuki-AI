import { createCanvas, loadImage } from 'canvas'

export async function generarTarjeta({ nombre, grupo, miembros, avatarUrl }) {
  const canvas = createCanvas(800, 400)
  const ctx = canvas.getContext('2d')

  // Fondo
  const fondo = await loadImage('./media/fondo-bienvenida.jpg')
  ctx.drawImage(fondo, 0, 0, 800, 400)

  // Avatar
  const avatar = await loadImage(avatarUrl)
  ctx.beginPath()
  ctx.arc(150, 200, 100, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(avatar, 50, 100, 200, 200)
  ctx.restore()

  // Texto
  ctx.font = 'bold 36px Sans'
  ctx.fillStyle = '#FFFFFF'
  ctx.fillText(`¡Bienvenido ${nombre}!`, 280, 180)
  ctx.font = '28px Sans'
  ctx.fillText(`a ${grupo}`, 280, 230)
  ctx.fillText(`👥 Miembros: ${miembros}`, 280, 280)

  return canvas.toBuffer()
}

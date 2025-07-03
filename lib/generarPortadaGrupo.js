import { createCanvas, loadImage, registerFont } from 'canvas'
import moment from 'moment-timezone'
import fetch from 'node-fetch'
import path from 'path'
import fs from 'fs'

// Asegúrate de tener una fuente elegante o usa el sistema
const fontPath = path.join(process.cwd(), './src/fonts/Montserrat-Bold.ttf') // O la fuente que uses
if (fs.existsSync(fontPath)) {
  registerFont(fontPath, { family: 'Montserrat' })
}

export async function generarPortadaGrupo({ nombreGrupo, miembros, creador, fecha, avatarUrl }) {
  const width = 800
  const height = 500
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // Fondo: imagen de grupo
  let imgBuffer = await fetch(avatarUrl).then(res => res.buffer()).catch(() => null)
  const fondo = await loadImage(imgBuffer || 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg')
  ctx.drawImage(fondo, 0, 0, width, height)

  // Capa oscura inferior
  ctx.fillStyle = 'rgba(0,0,0,0.65)'
  ctx.fillRect(0, height - 160, width, 160)

  // Tipografía
  ctx.font = 'bold 34px Montserrat'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(nombreGrupo, 40, height - 100)

  ctx.font = '24px Montserrat'
  ctx.fillStyle = '#dddddd'
  ctx.fillText(`👤 Creador: ${creador}`, 40, height - 60)
  ctx.fillText(`👥 Miembros: ${miembros} • ${fecha}`, 40, height - 30)

  return canvas.toBuffer()
    }

/*───────────────────────────────────────
  📁 Módulo:     horario.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import moment from 'moment-timezone'

const handler = async (m, { conn }) => {
  const tz = (zone) => moment().tz(zone).format('DD/MM HH:mm')

  const zonas = [
    { emoji: '🇵🇪', label: 'Perú', zona: 'America/Lima' },
    { emoji: '🇲🇽', label: 'México', zona: 'America/Mexico_City' },
    { emoji: '🇧🇴', label: 'Bolivia', zona: 'America/La_Paz' },
    { emoji: '🇨🇱', label: 'Chile', zona: 'America/Santiago' },
    { emoji: '🇦🇷', label: 'Argentina', zona: 'America/Argentina/Buenos_Aires' },
    { emoji: '🇨🇴', label: 'Colombia', zona: 'America/Bogota' },
    { emoji: '🇪🇨', label: 'Ecuador', zona: 'America/Guayaquil' },
    { emoji: '🇨🇷', label: 'Costa Rica', zona: 'America/Costa_Rica' },
    { emoji: '🇨🇺', label: 'Cuba', zona: 'America/Havana' },
    { emoji: '🇬🇹', label: 'Guatemala', zona: 'America/Guatemala' },
    { emoji: '🇭🇳', label: 'Honduras', zona: 'America/Tegucigalpa' },
    { emoji: '🇳🇮', label: 'Nicaragua', zona: 'America/Managua' },
    { emoji: '🇵🇦', label: 'Panamá', zona: 'America/Panama' },
    { emoji: '🇺🇾', label: 'Uruguay', zona: 'America/Montevideo' },
    { emoji: '🇻🇪', label: 'Venezuela', zona: 'America/Caracas' },
    { emoji: '🇵🇾', label: 'Paraguay', zona: 'America/Asuncion' },
    { emoji: '🇺🇸', label: 'New York', zona: 'America/New_York' },
    { emoji: '🇧🇷', label: 'Brasil', zona: 'America/Sao_Paulo' },
    { emoji: '🇬🇶', label: 'Guinea Ecuatorial', zona: 'Africa/Malabo' },
    { emoji: '🌏', label: 'Asia (Jakarta)', zona: 'Asia/Jakarta' }
  ]

  const ahora = zonas.map(z => `⏱️ ${z.label.padEnd(14)}: ${tz(z.zona)}`).join('\n')

  const zonaServidor = Intl.DateTimeFormat().resolvedOptions().timeZone
  const horaServidor = moment().tz(zonaServidor).format('DD/MM/YY HH:mm:ss')

  const mensaje = `「 🌐 ZONA HORARIA GLOBAL 」\n${ahora}\n\n📍 Zona del servidor: [${zonaServidor}] ${horaServidor}`

  await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.help = ['horario']
handler.tags = ['info']
handler.command = ['horario']

export default handler
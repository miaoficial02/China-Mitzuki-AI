/*───────────────────────────────────────
  📁 Módulo:     owner-contact.js
  🧠 Autor:      Carlos
  🛠 Proyecto:   Shizuka-AI
───────────────────────────────────────*/

import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  await m.react('👋')

  const suittag = global.suittag || '521234567890'
  const botname = global.botname || 'Shizuka-AI'
  const correo = global.contactEmail || 'soporte@shizuka.ai'
  const md = global.md || 'https://github.com/Kone457/Shizuka-AI'
  const channel = global.channel || 'https://whatsapp.com/channel/XXXXXXXXXX'
  const packname = global.packname || 'ShizukaBot'
  const dev = global.author || 'Carlos Dev'

  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  const pp = await conn.profilePictureUrl(who).catch(() => 'https://qu.ax/PRgfc.jpg')

  const bioOwnerData = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(() => null)
  const bioBotData = await conn.fetchStatus(`${conn.user.jid}`)?.catch(() => null)

  const bioOwner = bioOwnerData?.status?.toString() || 'Sin Biografía'
  const bioBot = bioBotData?.status?.toString() || 'Sin Biografía'

  const name = await conn.getName(who)

  await sendContactArray(conn, m.chat, [
    [
      suittag,
      `ᰔᩚ Propietario`,
      botname,
      `❀ No hacer spam`,
      correo,
      `⊹˚• Cuba •˚⊹`,
      md,
      bioOwner
    ],
    [
      conn.user.jid.split('@')[0],
      `✦ Es un bot`,
      packname,
      dev,
      correo,
      `Sabrá Dios 🫏`,
      channel,
      bioBot
    ]
  ], m)
}

handler.help = ['owner', 'creator', 'creador', 'dueño']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]

  const contacts = []

  for (let [number, name, org, labelTel, email, region, site, bio] of data) {
    number = number.replace(/[^0-9]/g, '')
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
item.ORG:${org}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${labelTel}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Región
item4.URL:${site}
item4.X-ABLabel:Website
item5.X-ABLabel:${bio}
END:VCARD`.trim()

    contacts.push({
      vcard,
      displayName: name
    })
  }

  return await conn.sendMessage(
    jid,
    {
      contacts: {
        displayName: contacts.length > 1 ? 'Contactos' : contacts[0].displayName,
        contacts
      }
    },
    {
      quoted,
      ...options
    }
  )
}
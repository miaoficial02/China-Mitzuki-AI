import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  m.react('👋')

  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)
  const pp = await conn.profilePictureUrl(who).catch(_ => 'https://qu.ax/PRgfc.jpg')
  
  const biografia = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(() => ({ status: 'Sin Biografía' }))
  const biografiaBot = await conn.fetchStatus(`${conn.user.jid.split('@')[0]}@s.whatsapp.net`).catch(() => ({ status: 'Sin Biografía' }))

  const bio = biografia.status?.toString() || 'Sin Biografía'
  const biobot = biografiaBot.status?.toString() || 'Sin Biografía'
  const name = await conn.getName(who)

  await sendContactArray(conn, m.chat, [
    [
      `${suittag}`,
      `ᰔᩚ Propietario`,
      botname,
      `❀ No Hacer Spam`,
      correo,
      `⊹˚• Cuba •˚⊹`,
      md,
      bio
    ],
    [
      `${conn.user.jid.split('@')[0]}`,
      `✦ Es Un Bot`,
      packname,
      dev,
      correo,
      `Sabra Dios 🫏`,
      channel,
      biobot
    ]
  ], m)
}

handler.help = ['creador', 'owner']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño']

export default handler

async function sendContactArray(conn, jid, data, quoted, options) {
  if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]
  const contacts = []

  for (let [number, name, org, label, email, region, website, bio] of data) {
    const cleanNumber = number.replace(/[^0-9]/g, '')
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
item.ORG:${org}
item1.TEL;waid=${cleanNumber}:${PhoneNumber('+' + cleanNumber).getNumber('international')}
item1.X-ABLabel:${label}
item2.EMAIL;type=INTERNET:${email}
item2.X-ABLabel:Email
item3.ADR:;;${region};;;;
item3.X-ABADR:ac
item3.X-ABLabel:Región
item4.URL:${website}
item4.X-ABLabel:Website
item5.X-ABLabel:${bio}
END:VCARD`.trim()
    contacts.push({ vcard, displayName: name })
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
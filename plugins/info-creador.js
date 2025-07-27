import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  const suittag = '18493907272' // Número sin "+" ni "@s.whatsapp.net"
  const botname = 'RukiaXzyBot'
  const correo = 'erenxz01@gmail.com'
  const md = 'https://github.com/erenxzy/Rukia-Botv2'
  const channel = 'https://whatsapp.com/channel/XXXX'
  const packname = 'XzyV2'
  const dev = 'Rukiav2'

  await m.react('🥷🏻')

  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)

  const bioOwnerData = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(() => ({ status: 'Sin Biografía' }))
  const bioBotData = await conn.fetchStatus(`${conn.user.jid}`)?.catch(() => ({ status: 'Sin Biografía' }))

  const bio = bioOwnerData?.status?.toString() || 'Sin Biografía'
  const bioBot = bioBotData?.status?.toString() || 'Sin Biografía'

  // Aviso en público
  await conn.sendMessage(m.chat, {
    text: `*👨🏻‍💻 Te envié Las Info De Mi Creador*`,
    mentions: [who]
  }, { quoted: m })

  // Envío por privado
  await sendContactArray(conn, who, [
    [
      suittag,
      `🥷🏻 RukiaCreator`,
      botname,
      `No spam`,
      correo,
      `Tokio`,
      md,
      bio
    ],
    [
      conn.user.jid.split('@')[0],
      `XzyBot✨`,
      packname,
      dev,
      correo,
      `antiprivado on `,
      channel,
      bioBot
    ]
  ])
}

handler.help = ['owner', 'creador']
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

  return await conn.sendMessage(jid, {
    contacts: {
      displayName: contacts.length > 1 ? 'Contactos' : contacts[0].displayName,
      contacts
    }
  }, { quoted, ...options })
}
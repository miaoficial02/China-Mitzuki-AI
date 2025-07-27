import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn }) => {
  const suittag = '18493907272' // Número sin "+" ni "@s.whatsapp.net"
  const botname = 'RukiaBotv2'
  const correo = 'erenxz01@gmail.com'
  const md = 'https://github.com/Kone457/Shizuka-AI'
  const channel = 'https://whatsapp.com/channel/XXXX'
  const packname = 'RukiaXzyV2'
  const dev = 'Dev RukiaXzy'

  await m.react('🥷🏻')

  const who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender)

  const bioOwnerData = await conn.fetchStatus(`${suittag}@s.whatsapp.net`).catch(() => ({ status: 'Sin Biografía' }))
  const bioBotData = await conn.fetchStatus(`${conn.user.jid}`)?.catch(() => ({ status: 'Sin Biografía' }))

  const bio = bioOwnerData?.status?.toString() || 'Sin Biografía'
  const bioBot = bioBotData?.status?.toString() || 'Sin Biografía'

  // Aviso en público
  await conn.sendMessage(m.chat, {
    text: `𝗔𝗾𝘂𝗶 𝗧𝗲 𝗗𝗲𝗷𝗼 𝗟𝗼𝘀 𝗗𝗮𝘁𝗼𝘀 𝗗𝗲 𝗠𝗶 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 𝗥𝘂𝗸𝗶𝗮𝗫𝘇𝘆`,
    mentions: [who]
  }, { quoted: m })

  // Envío por privado
  await sendContactArray(conn, who, [
    [
      suittag,
      `𝑿𝒁𝒀 𝑷𝑹𝑶𝑷𝑰𝑬𝑻𝑨𝑹𝑰𝑶`,
      botname,
      `ɴᴏ sᴘᴀᴍ ᴀʟ ɴᴜᴍᴇʀᴏ ⚠︎`,
      correo,
      `ᴛᴏᴋɪᴏ`,
      md,
      bio
    ],
    [
      conn.user.jid.split('@')[0],
      `𝑿𝒁𝒀 𝑩𝑶𝑻 `,
      packname,
      dev,
      correo,
      `ʙᴏᴛ ᴀᴄᴛɪᴠᴀ ᴀɴᴛɪᴘᴠ ᴛᴀᴍʙɪᴇɴ `,
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
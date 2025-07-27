let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let name = conn.getName(userId)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length

    let txt = `

╭━━━〔 🌨️ 𝗥𝗨𝗞𝗜𝗔-𝗕𝗢𝗧 𝗩2 - 𝗠𝗘𝗡𝗨 〕━━━╮
┃✎ ¡Hola @${userId.split('@')[0]}!
┃➥ Soy *${botname}*, tu bot virtual.
┃➤ Tiempo activo: *${uptime}*
┃✦ Comandos disponibles: *${totalCommands}*
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🔰 𝗜𝗡𝗙𝗢-𝗕𝗢𝗧 〕━━━╮
┃ ✦ menu
┃ ✦ uptime
┃ ✦ status
┃ ✦ ping
┃ ✦ speed
┃ ✦ sc
┃ ✦ staff
┃ ✦ creador
┃ ✦ links
┃ ✦ infobot
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📜 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 〕━━━╮
┃ ✦ reg
┃ ✦ unreg
┃ ✦ profile
┃ ✦ myns
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📥 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦 〕━━━╮
┃ ✦ play
┃ ✦ play2
┃ ✦ ytmp3
┃ ✦ ytmp4
┃ ✦ tiktok
┃ ✦ instagram
┃ ✦ facebook
┃ ✦ twitter
┃ ✦ spotify
┃ ✦ mediafire
┃ ✦ mega
┃ ✦ terabox
┃ ✦ apk
┃ ✦ pinvid
┃ ✦ gitclone
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🔍 𝗕𝗨𝗦𝗖𝗔𝗗𝗢𝗥𝗘𝗦 〕━━━╮
┃ ✦ google
┃ ✦ imagen
┃ ✦ pinterest
┃ ✦ yts
┃ ✦ npmjs
┃ ✦ github
┃ ✦ infoanime
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 ♻️ 𝗖𝗢𝗡𝗩𝗘𝗥𝗧𝗜𝗗𝗢𝗥𝗘𝗦 〕━━━╮
┃ ✦ tomp3
┃ ✦ tovideo
┃ ✦ tourl
┃ ✦ tts
┃ ✦ togif
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🤖 𝗜𝗔/𝗔𝗥𝗧𝗜𝗙𝗜𝗖𝗜𝗔𝗟 〕━━━╮
┃ ✦ ia
┃ ✦ gemini
┃ ✦ dalle
┃ ✦ flux
┃ ✦ simi
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🎌 𝗔𝗡𝗜𝗠𝗘/𝗥𝗘𝗔𝗖𝗜𝗢𝗡 〕━━━╮
┃ ✦ waifu
┃ ✦ hug
┃ ✦ kiss
┃ ✦ pat
┃ ✦ slap
┃ ✦ angry
┃ ✦ happy
┃ ✦ sad
┃ ✦ cry
┃ ✦ dance
┃ ✦ sleep
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🎴 𝗚𝗔𝗖𝗛𝗔𝗦/𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗝𝗘 〕━━━╮
┃ ✦ rw
┃ ✦ claim
┃ ✦ waifus
┃ ✦ wimage
┃ ✦ winfo
┃ ✦ regalar
┃ ✦ votar
┃ ✦ waifustop
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🖼️ 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 〕━━━╮
┃ ✦ sticker
┃ ✦ emojimix
┃ ✦ wm
┃ ✦ take
┃ ✦ setmeta
┃ ✦ delmeta
┃ ✦ qc
┃ ✦ img
┃ ✦ attp
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 💰 𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔/𝗥𝗨𝗞𝗜𝗔 〕━━━╮
┃ ✦ work
┃ ✦ suerte
┃ ✦ crime
┃ ✦ ruleta
┃ ✦ casino
┃ ✦ slot
┃ ✦ cartera
┃ ✦ bank
┃ ✦ depositar
┃ ✦ retirar
┃ ✦ transfer
┃ ✦ minar
┃ ✦ buy
┃ ✦ daily
┃ ✦ cofre
┃ ✦ semanal
┃ ✦ mensual
┃ ✦ robar
┃ ✦ robarxp
┃ ✦ baltop
┃ ✦ aventura
┃ ✦ curar
┃ ✦ cazar
┃ ✦ inventario
┃ ✦ mazmorra
┃ ✦ halloween
┃ ✦ navidad
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🧰 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦 〕━━━╮
┃ ✦ calcular
┃ ✦ clima
┃ ✦ horario
┃ ✦ fake
┃ ✦ hd
┃ ✦ letra
┃ ✦ ver
┃ ✦ shazam
┃ ✦ ss
┃ ✦ tamaño
┃ ✦ say
┃ ✦ todoc
┃ ✦ traducir
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👤 𝗣𝗘𝗥𝗙𝗜𝗟/𝗨𝗦𝗨𝗔𝗥𝗜𝗢𝗦 〕━━━╮
┃ ✦ marry
┃ ✦ divorce
┃ ✦ setgenero
┃ ✦ delgenero
┃ ✦ setbirth
┃ ✦ delbirth
┃ ✦ setdesc
┃ ✦ deldesc
┃ ✦ lb
┃ ✦ level
┃ ✦ premium
┃ ✦ confesar
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👥 𝗚𝗥𝗨𝗣𝗢𝗦/𝗖𝗢𝗡𝗙𝗜𝗚 〕━━━╮
┃ ✦ tag
┃ ✦ gp
┃ ✦ linea
┃ ✦ setwelcome
┃ ✦ setbye
┃ ✦ link
┃ ✦ admin
┃ ✦ revoke
┃ ✦ group open
┃ ✦ group close
┃ ✦ kick
┃ ✦ add
┃ ✦ promote
┃ ✦ demote
┃ ✦ gpbanner
┃ ✦ gpname
┃ ✦ gpdesc
┃ ✦ warn
┃ ✦ unwarn
┃ ✦ advlist
┃ ✦ bot on
┃ ✦ bot off
┃ ✦ mute
┃ ✦ unmute
┃ ✦ poll
┃ ✦ delete
┃ ✦ fantasmas
┃ ✦ kickfantasmas
┃ ✦ invocar
┃ ✦ setemoji
┃ ✦ kicknum
╰━━━━━━━━━━━━━━━━━━━━━━━━╯
> by RukiaXzyV2 Actualizada 🥷🏻✨


`.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: banner,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
    let seconds = Math.floor((ms / 1000) % 60)
    let minutes = Math.floor((ms / (1000 * 60)) % 60)
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    return `${hours}h ${minutes}m ${seconds}s`
}
import fs from 'fs'
import path from 'path'

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒') 
        conn.sendPresenceUpdate('composing', m.chat)

        const pluginsDir = './plugins'

        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))

        let response = `⚠️ \`\`\`𝗘𝗥𝗥𝗢𝗥𝗘𝗦 :\`\`\`\n\n`
        let hasErrors = false

        for (const file of files) {
            try {
                await import(path.resolve(pluginsDir, file))
            } catch (error) {
                hasErrors = true
                const stackLines = error.stack.split('\n')

                const errorLineMatch = stackLines[0].match(/:(\d+):\d+/) 
                const errorLine = errorLineMatch ? errorLineMatch[1] : 'Desconocido'

                response += `⚠️ *𝙀𝙍𝙍𝙊𝙍𝙀𝙎 𝙀𝙉:* ${file}\n\n - \`Mensaje :\` ${error.message}\n - \`Número de línea :\` ${errorLine}\n\n`
            }
        }

        if (!hasErrors) {
            response += '❄️ 𝙏𝙤𝙙𝙤 𝙀𝙨𝙩𝙖 𝙀𝙣 𝙊𝙧𝙙𝙚𝙣 𝙉𝙤 𝙎𝙚 𝙀𝙘𝙤𝙣𝙩𝙧𝙖𝙧𝙤𝙣 𝙀𝙧𝙧𝙤𝙧𝙚𝙨 𝘿𝙚 𝙎𝙞𝙣𝙩𝙖𝙭𝙞𝙭𝙨'
        }

        await conn.reply(m.chat, response, m)
        await m.react('✅')
    } catch (err) {
        await m.react('✖️') 
        await conn.reply(m.chat, `⚠️ 𝙊𝘾𝙐𝙍𝙄𝙊 𝙐𝙉 𝙀𝙍𝙍𝙊𝙍: ${err.message}`, m)
    }
}

handler.command = ['fix', 'rev', 'ruki']
handler.help = ['fix']
handler.tags = ['owner']
handler.rowner = true
export default handler
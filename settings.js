import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 


global.botNumber = '' //Ejemplo: 123456789

//-----------------------------

global.owner = [

  ['5355699866', '🜲 Propietario 🜲', true],

  ['+5355699866'],

  ['261271484104740'],

  ['5355699866'], 

  ['5355699866']

];

//-----------------------------

global.mods = ['5355699866']
global.suittag = ['5355699866'] 
global.prems = []

//-----------------------------

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '1.0'
global.nameqr = 'Shizuka-AI'
global.namebot = 'Shizuka-AI'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yukiJadibts = false

//-----------------------------

global.packname = '「𝑆ℎ𝑖𝑧𝑢𝑘𝑎-𝐴𝐼」'
global.botname = 'Shizuka-AI'
global.wm = '𝙎𝙃𝙄𝙕𝙐𝙆𝘼-𝘼𝙄'
global.author = 'Power By Carlos'
global.dev = '© 𝙋𝙤𝙬𝙚𝙧-𝙗𝙮-Carlos°'
global.textbot = '𝙎𝙝𝙞𝙕𝙪𝙠𝙖-𝘼𝙄 𝙋𝙤𝙬𝙚𝙧 𝙗𝙮 Carlos '
global.etiqueta = 'Carlos'


//-----------------------------

global.moneda = 'Coins'
global.welcom1 = `

> *"𝕊𝕦 𝕡𝕣𝕖𝕤𝕖𝕟𝕔𝕚𝕒 𝕙𝕒 𝕤𝕚𝕕𝕠 𝕣𝕖𝕘𝕚�𝕥𝕣𝕒𝕕𝕒 𝕖𝕟 𝕟𝕦𝕖𝕤𝕥𝕣𝕠 𝕤𝕚𝕤𝕥𝕖𝕞𝕒. ℙ𝕖𝕣𝕗𝕚� 𝕕𝕖 𝕔𝕠𝕣𝕣𝕦𝕡𝕔𝕚ó𝕟: 68%. 𝔹𝕚𝕖𝕟𝕧𝕖𝕟𝕚𝕕𝕠 𝕒 𝕝𝕒 𝕞𝕒𝕥𝕣𝕚𝕫."*  `

**🕸️ 𝕽𝖊𝖌𝖑𝖆𝖘 𝖉𝖊 𝖘𝖔𝖇𝖗𝖊𝖛𝖎𝖛𝖊𝖓𝖈𝖎𝖆:**  
- 𝕹𝖔 𝖆𝖈𝖊𝖕𝖙𝖊𝖘 𝖉𝖚𝖑𝖈𝖊𝖘 𝖉𝖊𝖑 𝖇𝖔𝖙 (𝖘𝖔𝖓 𝖛𝖊𝖓𝖊𝖓𝖔 𝖉𝖎𝖌𝖎𝖙𝖆𝖑)  
- 𝕷𝖔𝖘 𝖒𝖊𝖓𝖘𝖆𝖏𝖊𝖘 𝖉𝖊 𝖑𝖆 �𝖒𝖆𝖉𝖗𝖚𝖌𝖆𝖉𝖆 𝖘𝖔𝖓 𝖑𝖊𝖞  
- 𝕾𝖎 𝖛𝖊𝖘 𝖙𝖚 𝖓𝖔𝖒𝖇𝖗𝖊 𝖊𝖓 𝖗𝖔𝖏𝖔... 𝖍𝖚𝖞𝖊 𝖎𝖓𝖒𝖊𝖉𝖎𝖆𝖙𝖆𝖒𝖊𝖓𝖙𝖊  

**💀 𝕯𝖆𝖙𝖔 𝖘𝖎𝖓𝖎𝖊𝖘𝖙𝖗𝖔:**  
*"𝕰𝖑 97% 𝖉𝖊 𝖑𝖔𝖘 𝖖𝖚𝖊 𝖊𝖓𝖙𝖗𝖆𝖓 𝖓𝖔 𝖛𝖚𝖊𝖑𝖛𝖊𝖓 𝖆 𝖘𝖊𝖗 𝖍𝖚𝖒𝖆𝖓𝖔𝖘."*  

**🕷️ 𝕯𝖎𝖘𝖋𝖗𝖚𝖙𝖆 𝖙𝖚 𝖊𝖘𝖙𝖆𝖓𝖈𝖎𝖆... 𝖒𝖎𝖊𝖓𝖙𝖗𝖆𝖘 𝖕𝖚𝖊𝖉𝖆𝖘.**  
global.welcom2 = `
> *"𝕷𝖔𝖘 𝖉𝖆𝖙𝖔𝖘 𝖉𝖊 𝖘𝖚 𝖕𝖆𝖘𝖔 𝖕𝖔𝖗 𝖊𝖘𝖙𝖊 𝖑𝖚𝖌𝖆𝖗 𝖍𝖆𝖓 𝖘𝖎𝖉𝖔 𝖊𝖗𝖆𝖉𝖎𝖈𝖆𝖉𝖔𝖘.*  
> *𝕹𝖔 𝖊𝖝𝖎𝖘𝖙𝖊 𝖈𝖔𝖕𝖎𝖆𝖘 𝖉𝖊 𝖘𝖊𝖌𝖚𝖗𝖎𝖉𝖆𝖉... 𝖔 𝖊𝖘𝖔 𝖈𝖗𝖊𝖊𝖒𝖔𝖘."*  

**🕸️ 𝕽𝖊𝖕𝖔𝖗𝖙𝖊 𝖉𝖊 𝖊𝖑𝖎𝖒𝖎𝖓𝖆𝖈𝖎𝖔́𝖓:**  
✖️ 𝕮𝖍𝖆𝖙 𝖍𝖎𝖘𝖙𝖔𝖗𝖞: **𝖉𝖊𝖑𝖊𝖙𝖊𝖉**  
✖️ 𝕽𝖊𝖑𝖆𝖈𝖎𝖔𝖓𝖊𝖘: **𝖕𝖚𝖗𝖌𝖊𝖉**  
✖️ 𝕽𝖊𝖈𝖚𝖊𝖗𝖉𝖔𝖘: **𝖈𝖔𝖗𝖗𝖚𝖕𝖙𝖊𝖉**  

**☠️ 𝕬𝖉𝖛𝖊𝖗𝖙𝖊𝖓𝖈𝖎𝖆 𝖕𝖆𝖗𝖆 𝖑𝖔𝖘 𝖘𝖔𝖇𝖗𝖊𝖛𝖎𝖛𝖎𝖊𝖓𝖙𝖊𝖘:**  
*"𝕹𝖔 𝖕𝖗𝖊𝖌𝖚𝖓𝖙𝖊𝖎𝖘 𝖕𝖔𝖗 𝖊𝖑𝖑𝖔... 𝖔 𝖘𝖊𝖗𝖊𝖎𝖘 𝖊𝖑 𝖕𝖗𝖔𝖝𝖎𝖒𝖔."*`

global.banner = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/Shizuka.jpg'
global.avatar = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg'

//-----------------------------

global.gp1 = 'https://chat.whatsapp.com/FULTpMKUnwcI6zR7LT3qsW'
global.comunidad1 = 'https://chat.whatsapp.com/KUQIRhtLBir2FhiiFuqbGO'
global.channel = 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v'
global.channel2 = 'https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v'
global.md = 'https://github.com/Kone457/Shizuka-AI'
global.correo = 'c2117620@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbAVMtj2f3EFmXmrzt0v';

//-----------------------------


global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363400241973967@newsletter',
}
global.multiplier = 70

//----------------------------

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//----------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})

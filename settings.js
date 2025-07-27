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
['18493907272', 'RukiaCreator', true],
['', '', true],
['', '', true],
['', 'Colaborador', true],
];

// <-- Número @lid -->
['1920437612698@lid', 'Erenxszy', true],
['69480323522724@lid', 'NumeroBot', true],

//-----------------------------

global.mods = ['5355699866']
global.suittag = ['5355699866'] 
global.prems = []

//-----------------------------

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '1.0'
global.nameqr = 'RukiaBotv2Qr'
global.namebot = 'RukiaBotv2'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 


//-----------------------------

global.packname = '𝑹𝒖𝒌𝒊𝒂𝒗2'
global.botname = '𝑹𝒖𝒌𝒊𝒂 𝑩𝒐𝒕𝒗2'
global.wm = '𝑹𝑼𝑲𝑰𝑨-𝑩𝑶𝑻 𝑿𝒁𝒀𝒗2'
global.author = '𝐛𝐲 𝐄𝐫𝐞𝐧𝐱𝐳𝐲🥷🏻'
global.dev = '𝐃𝐞𝐯 𝐑𝐮𝐤𝐢𝐚𝐗𝐳𝐲🥷🏻✨'
global.textbot = '𝙍𝙪𝙠𝙞𝙖𝙓𝙯𝙮 𝘽𝙮 𝙀𝙧𝙚𝙣𝙭𝙯𝙮 🕊️ '
global.etiqueta = '𝙭𝙯𝙮🥷🏻'


//-----------------------------

global.moneda = 'coin'
global.welcom1 = `

 *🕸️ Registro del sistema:* 
> *"Su presencia ha sido registrada en nuestro sistema. Perfil de corrupción: 68%. Bienvenido a la matriz."*

*🕷️ Reglas de supervivencia:*  
- No aceptes dulces del bot (son veneno digital)  
- Los mensajes de la madrugada son ley  
- Si ves tu nombre en rojo... huye inmediatamente  

*💀 Dato siniestro:* 
> *El 97% de los que entran no vuelven a ser humanos.*

*🕷️ Disfruta tu estancia... mientras puedas.* `

global.welcom2 = `
> *Los datos de su paso por este lugar han sido erradicados.*  
> *No existe copias de seguridad... o eso creemos.*

*🕸️ Reporte de eliminación:*  
✖️ Chat history: *deleted*  
✖️ Relaciones: *purged*  
✖️ Recuerdos: *corrupted*

*☠️ Advertencia para los sobrevivientes:* 
> *"No preguntéis por ello... o seréis el próximo."*`

global.banner = 'https://qu.ax/Bupnx.jpg'
global.avatar = 'https://raw.githubusercontent.com/Kone457/Nexus/refs/heads/main/v2.jpg'

//-----------------------------

global.gp1 = 'https://chat.whatsapp.com/BwoPmcZVruTH2hjYyvoEs5?mode=ac_t'
global.comunidad1 = 'https://chat.whatsapp.com/GXwZX6U6f6OIxthaE4kF37?mode=ac_t'
global.channel = 'https://whatsapp.com/channel/0029VbBBn9R4NViep4KwCT3Z'
global.channel2 = 'https://whatsapp.com/channel/0029VbBBn9R4NViep4KwCT3Z'
global.md = 'https://github.com/Kone457/Shizuka-AI'
global.correo = 'erenxz01@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbBBn9R4NViep4KwCT3Z';

//-----------------------------


global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363417252896376@newsletter',
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

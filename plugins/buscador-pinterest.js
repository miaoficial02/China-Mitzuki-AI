import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== 'string') throw new TypeError(`jid debe ser un string, recibido: ${typeof jid}`);
    if (!Array.isArray(medias) || medias.length < 2) {
        throw new RangeError('Se necesitan al menos 2 imágenes para crear un álbum.');
    }

    const caption = options.text || options.caption || '';
    const delay = !isNaN(options.delay) ? Number(options.delay) : 500;
    const quoted = options.quoted || null;

    const album = baileys.generateWAMessageFromContent(
        jid,
        { messageContextInfo: {}, albumMessage: { expectedImageCount: medias.length } },
        {}
    );

    await conn.relayMessage(jid, album.message, { messageId: album.key.id });

    for (let i = 0; i < medias.length; i++) {
        const { type, data } = medias[i];
        const msg = await baileys.generateWAMessage(
            jid,
            { [type]: data, ...(i === 0 ? { caption } : {}) },
            { upload: conn.waUploadToServer }
        );

        msg.message.messageContextInfo = {
            messageAssociation: {
                associationType: 1,
                parentMessageKey: album.key,
            },
        };

        await conn.relayMessage(jid, msg.message, { messageId: msg.key.id });
        await new Promise(resolve => setTimeout(resolve, delay));
    }

;
}

const pinterest = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `❀ Por favor, ingresa lo que deseas buscar por Pinterest.`, m);
    }

    await m.react('🕒');

    // Descargar miniatura personalizada
    const thumbnail = await fetch('https://qu.ax/GoxWU.jpg').then(res => res.buffer());

    conn.reply(m.chat, '✧ *Descargando imágenes de Pinterest...*', m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                showAdAttribution: true,
                title: packname,
                body: dev,
                previewType: 0,
                thumbnail,
                sourceUrl: redes
            }
        }
    });

    try {
        const res = await fetch(`https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(text)}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length < 2) {
            return conn.reply(m.chat, '✧ No se encontraron suficientes imágenes para un álbum.', m);
        }

        const images = data.slice(0, 10).map(img => ({
            type: 'image',
            data: { url: img.image_large_url }
        }));

        const caption = `❀ *Resultados de búsqueda para:* ${text}`;
        await sendAlbumMessage(m.chat, images, { caption, quoted: m });

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(m.chat, '⚠︎ Hubo un error al obtener las imágenes de Pinterest.', m);
    }
};

pinterest.help = ['pinterest <query>'];
pinterest.tags = ['buscador', 'descargas'];
pinterest.command = ['pinterest', 'pin'];
pinterest.register = true;
pinterest.group = true;

export default pinterest;
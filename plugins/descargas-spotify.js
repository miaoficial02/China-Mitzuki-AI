import axios from 'axios';
import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Por favor, proporciona el nombre de una canción o artista.`, m);

  try {
    const songs = await spotifyxv(text);
    if (!songs.length) throw "✧ No se encontró la canción.";

    const song = songs[0];
    const apiUrl = `https://api.sylphy.xyz/download/spotify?url=${encodeURIComponent(song.url)}&apikey=sylph-96ccb836bc`;

    const res = await fetch(apiUrl);
    if (!res.ok) throw `⛔ Error de API: código ${res.status}`;

    const data = await res.json().catch((e) => {
      console.error('⚠️ Error parseando JSON:', e);
      throw "✘ Error al interpretar la respuesta del servidor.";
    });

    const audioUrl =
      data?.data?.dl_url ||
      data?.data?.url ||
      data?.url ||
      data?.result?.url;

    if (!audioUrl) {
      console.log("🧩 Respuesta inesperada de la API:", data);
      throw "✘ No se encontró 'dl_url' en la respuesta de la API.";
    }

    const info = `🎶 *${data.data?.title || song.name}*
🎤 *Artista:* ${data.data?.artist || song.artista.join(", ")}
💿 *Álbum:* ${data.data?.album || song.album}
🕐 *Duración:* ${data.data?.duration || song.duracion}
🔗 *Spotify:* ${song.url}

⏳ Shizuka está preparando tu melodía...`;

    await conn.sendMessage(m.chat, {
      text: info,
      contextInfo: {
        forwardingScore: 999999,
        isForwarded: false,
        externalAdReply: {
          showAdAttribution: true,
          containsAutoReply: true,
          renderLargerThumbnail: true,
          title: 'Shizuka Music',
          body: '✨ Disfruta el ritmo con estilo',
          thumbnailUrl: data.data?.img || 'https://raw.githubusercontent.com/Kone457/Nexus/main/Shizuka.jpg',
          mediaUrl: song.url,
          sourceUrl: song.url
        }
      }
    }, { quoted: m });

    // 🎵 Enviar audio
    await conn.sendMessage(m.chat, {
      audio: { url: audioUrl },
      fileName: `${data.data?.title || song.name}.mp3`,
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en handler:", e);
    m.reply(e.message || e);
  }
};

handler.command = ['spotify', 'splay'];
handler.help = ['spotify <canción o artista>'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;

// 🔍 Función de búsqueda en Spotify
async function spotifyxv(query) {
  const token = await tokens();
  const res = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data.tracks.items.map((track) => ({
    name: track.name,
    artista: track.artists.map((a) => a.name),
    album: track.album.name,
    duracion: timestamp(track.duration_ms),
    url: track.external_urls.spotify,
    imagen: track.album.images?.[0]?.url || ''
  }));
}

// 🎫 Obtener token de Spotify
async function tokens() {
  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64')
        }
      }
    );
    return res.data.access_token;
  } catch {
    throw "🛑 Error al generar token de Spotify.";
  }
}

// ⏱️ Formatear duración
function timestamp(ms) {
  const min = Math.floor(ms / 60000);
  const sec = Math.floor((ms % 60000) / 1000);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}
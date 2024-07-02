import { toAudio } from '../../lib/converter.cjs'; // Import statement placed outside the try block

const tomp3 = async (m, gss) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    const validCommands = ['tomp3', 'voice'];

    if (!validCommands.includes(cmd)) return;

    if (!m.quoted || m.quoted.mtype !== 'videoMessage') {
      return m.reply(`𝙎𝙚𝙣𝙙/𝙍𝙚𝙥𝙡𝙮 𝙬𝙞𝙩𝙝 𝙑𝙞𝙙𝙚𝙤 𝙩𝙤 𝙘𝙤𝙣𝙫𝙚𝙧𝙩 𝙞𝙣𝙩𝙤 𝙈𝙋3 𝙬𝙞𝙩𝙝 𝙘𝙖𝙥𝙩𝙞𝙤𝙣 ${prefix + cmd}`);
    }

    m.reply('Converting to MP3, please wait...');
    const media = await m.quoted.download();
    const audio = await toAudio(media, 'mp4'); // Correctly importing toAudio function

    await gss.sendMessage(m.from, { document: audio, mimetype: 'audio/mpeg', fileName: `Converted By ${gss.user.name}.mp3` }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default tomp3;

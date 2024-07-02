import axios from 'axios';
import { mediafireDl } from 'mfiredlcore-vihangayt';

const mediafireDownload = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['mediafire', 'mf', 'mfdownload'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐌𝐞𝐝𝐢𝐚𝐅𝐢𝐫𝐞 𝐔𝐑𝐋.');

    try {
      await m.React('🔎');

      const mediafireUrl = text;
      const mediafireInfo = await mediafireDl(mediafireUrl);

      if (mediafireInfo && mediafireInfo.link) {
        const mediaUrl = mediafireInfo.link;
        const caption = `🇱🇰 P͢O͢W͢E͢R͢ B͢Y͢ R͢C͢D͢ M͢D͢\n> File: ${mediafireInfo.name}\n> Size: ${mediafireInfo.size}\n> Date: ${mediafireInfo.date}`;


        const extension = mediaUrl.split('.').pop().toLowerCase();


        await Matrix.sendMedia(m.from, mediaUrl, extension, caption, m);

        await m.React('✅');
      } else {
        throw new Error('Invalid response from MediaFire.');
      }
    } catch (error) {
      console.error('Error downloading MediaFire file:', error.message);
      m.reply('Error downloading MediaFire file.');
      await m.React('❌');
    }
  }
};

export default mediafireDownload;

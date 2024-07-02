import { lyrics, lyricsv2 } from '@bochilteam/scraper';

const lyricsCommand = async (m, Matrix) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['lyrics'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      return m.reply('𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐬𝐨𝐧𝐠 𝐧𝐚𝐦𝐞 𝐭𝐨 𝐠𝐞𝐭 𝐭𝐡𝐞 𝐥𝐲𝐫𝐢𝐜𝐬.');
    }

    m.reply('𝐒𝐞𝐚𝐫𝐜𝐡𝐢𝐧𝐠 𝐟𝐨𝐫 𝐥𝐲𝐫𝐢𝐜𝐬, 𝐩𝐥𝐞𝐚𝐬𝐞 𝐰𝐚𝐢𝐭...');

    const result = await lyricsv2(text).catch(async () => await lyrics(text));

    if (!result) {
      return m.reply('No lyrics found for the provided song.');
    }

    const replyMessage = `
      *✍️ Title:* ${result.title}
      *👨‍🎤 Author:* ${result.author}
      *🔗 Url:* ${result.link}

      *📝 Lyrics:*\n\n ${result.lyrics}
    `.trim();

    m.reply(replyMessage);

  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default lyricsCommand;

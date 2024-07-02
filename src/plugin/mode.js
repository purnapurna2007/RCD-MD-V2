import config from '../../config.cjs';

const modeCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim().toLowerCase();

  if (cmd === 'mode') {
    if (!isCreator) return m.reply("*📛 T͙H͙I͙S͙ I͙S͙ A͙N͙ O͙W͙N͙E͙R͙ C͙O͙M͙M͙A͙N͙D͙*");
    let responseMessage;

    if (text === 'public') {
      config.MODE = 'public';
      responseMessage = "𝐌𝐨𝐝𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐬𝐞𝐭 𝐭𝐨 𝐩𝐮𝐛𝐥𝐢𝐜.";
    } else if (text === 'self') {
      config.MODE = 'self';
      responseMessage = "𝐌𝐨𝐝𝐞 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐬𝐞𝐭 𝐭𝐨 𝐬𝐞𝐥𝐟.";
    } else {
      responseMessage = "Usage:\n- `mode public`: Set mode to public\n- `mode self`: Set mode to self";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default modeCommand;

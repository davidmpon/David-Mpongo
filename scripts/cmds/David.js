const axios = require('axios');

const Prefixes = [
  'david',"mpongo",
];

function apply(text, fontMap) {
  return text.replace(/[a-zA-Z0-9]/g, (char) => fontMap[char] || char);
}

const sans = {
  a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚎", g: "𝚎", h: "𝚑",
  i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙",
  q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡",
  y: "𝚢", z: "𝚣", A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅",
  G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉", K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍",
  O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓", U: "𝐔", V: "𝐕",
  W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙", "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛",
  "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
};

module.exports = {
  config: {
    name: 'David',
    version: '1.10',
    author: 'ミ★𝐒𝐎𝐍𝐈𝐂✄𝐄𝐗𝐄 3.0★彡', // don't change credits
    role: 0,
    category: 'ai',
    longDescription: {
      en: 'AI is designed to answer user queries and engage in conversations based on user input. It provides responses and insights on a wide range of topics.'
    },
    guide: {
      en: `
      Command: ai [question]
      - Use this command to ask a question to the AI chatbot.
      - Example: ai What is the weather like today?

      Reply with "reset" to clear the conversation history.
      `
    }
  },
  onStart: async () => {},
  onChat: async ({ api, event, args, message }) => {
    const prefix = Prefixes.find(p => event.body.toLowerCase().startsWith(p));
    if (!prefix) return;

    const question = event.body.slice(prefix.length).trim();
    if (!question) {
      return message.reply("ミ★𝔻𝕒𝕧𝕚𝕕✄𝕄𝕡3.0★彡\n━━━━━━━━━━━━━━━━\n✰𝗦𝗮𝗹𝘂𝘁 𝗹'𝗮𝗺𝗶(𝗲)✋🩵 𝗲𝘀-𝘁𝘂 𝗲𝗻 𝗱𝗶𝗳𝗳𝗶𝗰𝘂𝗹𝘁é𝘀?🔔\n𝗦𝗶 𝗼𝘂𝗶 𝗽𝗼𝘀𝗲 𝗺𝗼𝗶 𝘁𝗮 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻🦅✅");
    }

    const uid = event.senderID;

    api.setMessageReaction("⏰", event.messageID, () => {}, true);

    const startTime = Date.now();

    try {
      const response = await axios.get('https://c-v1.onrender.com/c/v1', {
        params: {
          message: question,
          model: 'Nox',
          apiKey: 'c92728090acc',
          userId: uid
        }
      });

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const answer = apply(response.data.response, sans);
      const endTime = Date.now();
      const processTimeMs = endTime - startTime;
      const processTimeSec = (processTimeMs / 1000).toFixed(2);

      const replyMessage = await message.reply(`ミ★𝔻𝕒𝕧𝕚𝕕✄𝕄𝕡3.0★彡\n━━━━━━━━━━━━━━━━\n🗣| ${answer}🥀✨💦\n━━━━━━━━━━━━━━━━`); 
      global.GoatBot.onReply.set(replyMessage.messageID, {
        commandName: module.exports.config.name,
        messageID: replyMessage.messageID,
        author: event.senderID
      });

      api.setMessageReaction("😸", event.messageID, () => {}, true);

    } catch (error) {
      console.error(`Error fetching response: ${error.message}, Status Code: ${error.response ? error.response.status : 'N/A'}`);
      message.reply(`⚠ An error occurred while processing your request. Error: ${error.message}${error.response ? `, Status Code: ${error.response.status}` : ''}. Please try again later.`);

      api.setMessageReaction("🤷‍♂", event.messageID, () => {}, true);
    }
  },

  onReply: async ({ api, event, Reply, message }) => {
    const { author } = Reply;
    const userReply = event.body.trim();
    const userId = event.senderID;

    if (global.GoatBot.onReply.has(event.messageID)) {
      return;
    }

    api.setMessageReaction("🤔", event.messageID, () => {}, true);

    if (userReply.toLowerCase() === 'reset') {
      try {
        const response = await axios.get('https://c-v1.onrender.com/c/r', {
          params: { userId }
        });

        if (response.status !== 200 || !response.data.message) {
          throw new Error('Invalid or missing response from API');
        }

        message.reply("✅ The conversation history has been successfully cleared.");

        api.setMessageReaction("😼", event.messageID, () => {}, true);

      } catch (error) {
        console.error(`Error resetting conversation: ${error.message}, Status Code: ${error.response ? error.response.status : 'N/A'}`);
        message.reply(`⚠ An error occurred while clearing the conversation history. Error: ${error.message}${error.response ? `, Status Code: ${error.response.status}` : ''}. Please try again later.`); 

        api.setMessageReaction("🫥", event.messageID, () => {}, true);
      }
      return;
    }

    const startTime = Date.now();

    try {
      const response = await axios.get('https://c-v1.onrender.com/c/v1', {
        params: {
          message: userReply,
          model: 'nox',
          apiKey: 'c92728090acc',
          userId: userId
        }
      });

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const followUpResponse = apply(response.data.response, sans);
      const endTime = Date.now();
      const processTimeMs = endTime - startTime;
      const processTimeSec = (processTimeMs / 1000).toFixed(2);

      const followUpMessage = await message.reply(`ミ★𝔻𝕒𝕧𝕚𝕕✄𝕄ℙ3.0★彡\n━━━━━━━━━━━━━━━━\n🗣| ${followUpResponse}🥀✨💦\n━━━━━━━━━━━━━━━━`);

      global.GoatBot.onReply.set(followUpMessage.messageID, {
        commandName: module.exports.config.name,
        messageID: followUpMessage.messageID,
        author: event.senderID
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (error) {
      console.error(`Error fetching follow-up response: ${error.message}, Status Code: ${error.response ? error.response.status : 'N/A'}`);
      message.reply(`⚠ An error occurred while processing your reply. Error: ${error.message}${error.response ? `, Status Code: ${error.response.status}` : ''}. Please try again later.`);

      api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
  }
};

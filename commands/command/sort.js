const { readMembersVoice } = require("../../lib/findMembers");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    try {
      const data = await readMembersVoice(message);

      message.channel.send(`ID: ${data.channelID} \nAmount: ${data.members.length}`);
    } catch (err) {
      message.channel.send(err);
    }
  },
};

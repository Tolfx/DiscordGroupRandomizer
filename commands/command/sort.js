const { readMembersVoice } = require("../../lib/findMembers");
const { createChannel } = require("../../lib/manageChannels");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    const roles = [
      {
        name: "test1",
        id: "670167467552800778",
      },
      {
        name: "test2",
        id: "755386039572496414",
      },
    ];
    try {
      const data = await readMembersVoice(message);

      message.channel.send(`ID: ${data.channelID} \nAmount: ${data.members.length}`);
      createChannel(message, roles);
    } catch (err) {
      message.channel.send(err);
    }
  },
};

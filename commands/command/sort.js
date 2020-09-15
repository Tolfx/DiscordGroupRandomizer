const { readMembersVoice } = require("../../lib/findMembers");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    try {
      const Members = await readMembersVoice(message);

      console.log(Members);
    } catch (err) {
      message.channel.send(err);
    }
  },
};

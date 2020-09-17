const { readMembersVoice } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    try {
      let names = "Grupprum";
      let nameArray = [];
      const data = await readMembersVoice(message);

      for (let i = 0; i < data.members.length; ++i) {
        nameArray.push((names += i));
      }

      await createRoles(message, data.members.length, nameArray).then(async (roles) => {
        await createChannel(message, roles);
      });
    } catch (err) {
      message.channel.send(err);
    }
  },
};

const { readMembersVoice } = require("../../lib/findMembers");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    readMembersVoice(message, (id, members) => {
      console.log(id);
      console.log(members);
    });
  },
};

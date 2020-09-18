const { readMembersVoice } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const _config = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    try {
      //Stop!
      fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
        if (data) {
          return message.channel.send(
            `You've been using this command before, please use ${_config.prefix}clear first.`
          );
        } else {
          let names = "Grupprum";
          let nameArray = [];
          const data = await readMembersVoice(message);

          for (let i = 0; i < data.members.length; ++i) {
            nameArray.push((names += i + 1));
          }

          await createRoles(message, data.members.length, nameArray).then(async (roles) => {
            //Channel
            let server = await createChannel(message, roles);

            //Channel ID
            let serverID = server.map((channel) => channel.id);

            //Channel Name
            let serverName = server.map((channel) => channel.name);

            //Roles ID
            let roleID = roles.map((role) => role.id);

            //Save it in an object
            const dataObject = {
              authorID: message.author.id,
              serverID,
              serverName,
              roleID,
            };

            //Save it for now for later.
            fs.appendFile(
              `./data/${message.author.id}.json`,
              JSON.stringify(dataObject),
              (err, file) => {
                if (err) throw err;
              }
            );
          });
        }
      });
    } catch (err) {
      message.channel.send(err);
    }
  },
};

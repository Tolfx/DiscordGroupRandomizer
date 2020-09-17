const { readMembersVoice } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const fs = require("fs");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    try {
      //Stop!
      fs.readFile(`./data/${message.author.username}.json`, async (err, data) => {
        if (data) {
          return message.channel.send("Uh.. No!");
        } else {
          let names = "Grupprum";
          let nameArray = [];
          const data = await readMembersVoice(message);

          for (let i = 0; i < data.members.length; ++i) {
            nameArray.push((names += i));
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
              author: message.author.username,
              serverID,
              serverName,
              roleID,
            };

            //Save it for now for later.
            fs.appendFile(
              `./data/${message.author.username}.json`,
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

const { readMembersVoice, moveMember } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const _config = require("../../config.json");
const fs = require("fs");

module.exports = {
  name: "sort",
  aliases: ["s"],
  description: "Sorts something",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send("Please provide an amount of how many groups you want");

    const amountOfGroups = parseInt(args[0]);

    try {
      //Stop!
      fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
        if (data) {
          return message.channel.send(
            `You've been using this command before, please use ${_config.prefix}clear first.`
          );
        } else {
          //The name of the channels
          let names = `${message.author.username} Grupprum`;

          //An array for the channels
          let nameArray = [];

          //The data of the members on the voice channel.
          const data = await readMembersVoice(message);

          //Creates the names kek
          for (let i = 0; i < amountOfGroups; ++i) {
            nameArray.push((names += i + 1));
          }

          //Create the roles.
          await createRoles(message, amountOfGroups, nameArray).then(async (roles) => {
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
            moveMember(client, message, data.members[0].id, serverID[0]);
          });
        }
      });
    } catch (err) {
      message.channel.send(err);
    }
  },
};

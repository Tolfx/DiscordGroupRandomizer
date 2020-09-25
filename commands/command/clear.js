const fs = require("fs");
const _config = require("../../config.json");
const { removeChannels } = require("../../lib/manageChannels");
const { removeRoles } = require("../../lib/manageServer");
const { readMembersVoice, moveMember, giveRole } = require("../../lib/manageMembers");

module.exports = {
  name: "clear",
  aliases: ["s"],
  description: "Clears the users channels and roles and etc..",
  run: async (client, message, args) => {
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {
        //Parse the object
        const information = JSON.parse(data);

        for (let i = 0; i < information.Members.length; ++i) {
          removeChannels(message, information.serverID).catch((err) => message.channel.send(err));

          //Remove the roles
          removeRoles(message, information.roleID).catch((err) => message.channel.send(err));

          if (i + 1 === information.Members.length) {
            message.channel.send("Cleared everything!");
          }
        }

        //Delete the file.
        fs.unlink(`./data/${message.author.id}.json`, (err) => {
          if (err) return console.log("an error");
        });
      } else {
        return message.channel.send(`Please use ${_config.prefix}sort first`);
      }
    });
  },
};

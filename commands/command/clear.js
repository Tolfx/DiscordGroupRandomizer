const fs = require("fs");
const _config = require("../../config.json");
const { removeChannels } = require("../../lib/manageChannels");
const { removeRoles } = require("../../lib/manageServer");

module.exports = {
  name: "clear",
  aliases: ["s"],
  description: "Clears the users channels and roles and etc..",
  run: async (client, message, args) => {
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {
        //Parse the object
        const information = JSON.parse(data);

        //Remove the channels
        removeChannels(message, information.serverID);

        //Remove the roles
        removeRoles(message, information.roleID);

        //Delete the file.
        fs.unlink(`./data/${message.author.id}.json`);
      } else {
        return message.channel.send(`Please use ${_config.prefix}sort first`);
      }
    });
  },
};

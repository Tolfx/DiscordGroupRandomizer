const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const { readMembersVoice, moveMember, giveRole } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const fs = require("fs");
const _config = require("../../config.json");

module.exports = {
  name: "gather",
  description: "Gathers all of the members back.",
  run: async (client, message, args) => {
    //Stop!
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {
        //Parse the object
        const information = JSON.parse(data);

        for (let i = 0; i < information.Members.length; ++i) {
          moveMember(client, message, information.Members[i].Member, information.authorChannel);

          if (i + 1 === information.Members.length) {
            message.channel.send("All of the members should be here.");
          }
        }
      } else {
        message.channel.send("You have nothing to gather..");
      }
    });
  },
};

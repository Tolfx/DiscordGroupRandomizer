const { readMembersVoice, moveMember, giveRole } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const _config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "get",
    description: "Gets a specific member from a voice channel.",
    run: async (client, message, args) => {

        fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
            if (data) {
                //Parse the object
                const information = JSON.parse(data);
      
              for (let i = 0; i < information.Members.length; ++i) {
            
                if (i + 1 === information.Members.length) {
                    moveMember(client, message, information.Members[i].Member, information.authorChannel);
                    message.channel.send("All of the members should be here.");
                }
              }
            } else {
                message.channel.send("You have nothing to gather..");
            }
        });
    }
}
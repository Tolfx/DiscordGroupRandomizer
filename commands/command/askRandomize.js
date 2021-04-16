const { getChannelName } = require("../../lib/manageChannels");
const { readMembersVoice } = require("../../lib/manageMembers")
const { stripIndent } = require('common-tags')
const _config = require("../../config.json")
const fs = require("fs");

module.exports = {
  name: "askrand",
  description: "pings a random person",
  run: async (client, message, args) => {
    //Stop!
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {

        if(!args[0])
            return message.channel.send(stripIndent`
            Please pick which \"Grupp Rum\" you want to ask..
            
            For an example: \`${_config.prefix}askrand 2\``)

        //Parse the buffer
        const information = JSON.parse(data);

        for (let i = 0; i < information.serverID.length; ++i) {
            if (parseInt(args[0]-1) === information.serverID.indexOf(information.serverID[i])) {
                const pickMember = () => {
                    const serverName = getChannelName(client, information.serverID[i]);
                    const randomizer = Math.floor(Math.random() * information.Members.length);
                    const luckyWinner = information.Members[randomizer];

                    const message = stripIndent`
                    Picked a random member from voice channel: ${serverName}
                    *drum rolls*
                    !!! <@${luckyWinner}> !!!`
                    return message;
                }

                message.channel.send(pickMember)
            };
        }
      } else {
        message.channel.send("You have don't have any reason to use this command..");
      }
    });
  },
};

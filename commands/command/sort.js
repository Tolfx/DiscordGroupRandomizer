const { readMembersVoice, moveMember, giveRole } = require('../../lib/manageMembers');
const { createChannel } = require('../../lib/manageChannels');
const { createRoles } = require('../../lib/manageServer');
const _config = require('../../config.json');
const fs = require('fs');

module.exports = {
  name: 'sort',
  aliases: ['s'],
  description: 'Sorts something',
  run: async (client, message, args) => {
    if (!message.member._roles.includes(_config.adminRoleID))
      return message.channel.send('Not admin');

    if (!args[0])
      return message.channel.send('Please provide an amount of how many groups you want');

    if (typeof parseInt(args[0]) !== 'number') return message.channel.send('Not a number');

    const amountOfGroups = parseInt(args[0]);
    let somevariableidk = 0;

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
            nameArray.push((names += i));
          }

          //Create the roles.
          await createRoles(message, amountOfGroups, nameArray).then(async (roles) => {
            //Channel
            let server = await createChannel(message, roles);

            //Channel ID
            let serverID = server.map((channel) => channel.id);

            //Roles ID
            let roleID = roles.map((role) => role.id);

            let membersID = data.members.map((r) => r.id);

            //Save it in an object
            const dataObject = {
              authorID: message.author.id,
              authorChannel: data.channelID,
              serverID,
              roleID,
              Members: membersID,
            };

            //Save it for now for later.
            fs.appendFile(
              `./data/${message.author.id}.json`,
              JSON.stringify(dataObject),
              (err, file) => {
                if (err) throw err;
              }
            );
            for (let i = 0; i < data.members.length; ++i) {
              if (somevariableidk === amountOfGroups) {
                somevariableidk = 0;
              }
              if (data.members[i].id === message.author.id) {
                return;
              }
              giveRole(message, data.members[i].id, roleID[somevariableidk]);
              moveMember(client, message, data.members[i].id, serverID[somevariableidk]);
              ++somevariableidk;
            }
          });
        }
      });
    } catch (err) {
      message.channel.send(err);
    }
  },
};

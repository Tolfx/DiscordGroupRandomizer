const { moveMember } = require("../../lib/manageMembers");
const { stripIndent } = require('common-tags')
const fs = require("fs");

module.exports = {
  name: "gather",
  description: "Gathers all of the members back.",
  run: async (client, message, args) => {
    //Stop!
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {
        //Parse the object
        const information = JSON.parse(data);

        let memberWhoLeft = [];

        for (let i = 0; i < information.Members.length; ++i) {
          await moveMember(client, message, information.Members[i].Member, information.authorChannel, (err, data) => {
            if (err) {
              memberWhoLeft.push(information.Members[i].Member)
              console.log(`User with ID: ${information.Members[i].Member} left`); 
            }

            if (i + 1 === information.Members.length) {
              message.channel.send(stripIndent`
              Moved all of the members
              
              ${memberWhoLeft.length === 0 ? "" : "**Missing Members:**"}
              ${memberWhoLeft.map(data => `<@${data}>`)}`);
            };
          })
        }
      } else {
        message.channel.send("You have nothing to gather..");
      }
    });
  },
};

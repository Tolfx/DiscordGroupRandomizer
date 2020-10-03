const { moveMember } = require("../../lib/manageMembers");
const fs = require("fs");
const _config = require("../../config.json");

module.exports = {
  name: "spread",
  description: "Spreads all of the members back to their channels.",
  run: async (client, message, args) => {
    //Stop!
    fs.readFile(`./data/${message.author.id}.json`, async (err, data) => {
      if (data) {
        //Parse the object
        const information = JSON.parse(data);

        let memberWhoLeft = []

        for (let i = 0; i < information.Members.length; ++i) {
          await moveMember(client, message, information.Members[i].Member, information.Members[i].Server, (err, data) => {
            if (err) {
              memberWhoLeft.push(information.Members[i].Member)
              console.log(`User with ID: ${information.Members[i].Member} left`); 
            }

            if (i + 1 === information.Members.length) {
              message.channel.send("Spread all of the members back according to their channels.");
            };
          })
        }
      } else {
        message.channel.send("You have nothing to spread..");
      }
    });
  },
};

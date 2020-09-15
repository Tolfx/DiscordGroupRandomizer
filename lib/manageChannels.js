const _config = require("../config.json");

module.exports = {
  /**
   * @param {Object} message The message from discord
   * @param {Array} roles The raw object of the role.
   * @description Creates a server for the specific role name and id.
   * The role has to be an Array otherwise wont work.
   */
  createChannel: (message, roles) => {
    return new Promise((resolve, reject) => {
      let serverArray = [];
      //Loop each role to make their specific channel.
      for (let i = 0; i < roles.length; i++) {
        if (typeof roles[i].id === undefined || typeof roles[i].name === undefined) {
          reject(`Can't find ID or Name of the role..`);
        }
        const server = message.guild;
        //Get the name of the roles, and then name the channel for their name.
        const voiceChannelName = roles[i].name;

        //Create the channels.
        server.channels
          .create(voiceChannelName, {
            type: "voice",
          })
          .then((voiceChannel) => {
            //Move it to a parentchild, so it wont be confusing.
            voiceChannel.setParent(_config.parentChild);

            //@everyone wont see the channel.
            voiceChannel.overwritePermissions([
              {
                id: server.roles.everyone.id,
                deny: ["VIEW_CHANNEL"],
              },
              {
                id: roles[i].id,
                allow: ["VIEW_CHANNEL"],
              },
            ]);

            serverArray.push(voiceChannel);
            if (i + 1 === roles.length) {
              resolve(serverArray);
            }
          });
      }
    });
  },
};

const _config = require("../config.json");

module.exports = {
  /**
   * @param {Object} message The message from discord
   * @param {Array} roles The raw object of the role.
   * @description Creates a server for the specific role name and id.
   * The role has to be an Array otherwise wont work.
   * 
   * @example
   const roles = [
      {
        name: "test1",
        id: "670167467552800778",
      },
      {
        name: "test2",
        id: "755386039572496414",
      },
    ];

    createChannel(message, roles).then((data) => {
        console.log(data.map((data) => data.id));
    });
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
  /**
   * @param message The message from discord
   * @param {Array} id The ID of the channel.
   */
  removeChannels: (message, id) => {
    return new Promise((resolve, reject) => {
      const channel = message.guild.channels;

      for (let i = 0; i < id.length; ++i) {
        let channelDelete = channel.cache.find((r) => r.id === id[i]);
        if (channelDelete === undefined) {
          return reject(`The channels seems to be deleted already. Can't find it`);
        } else {
          channelDelete.delete();
        }
      }
    });
  },

  getChannelName: (client, serverID) => {
    const channel = client.channels.cache.find(s => s.id === serverID);

    return channel.name
  }
};

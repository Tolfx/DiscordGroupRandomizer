const _config = require("../config.json");

module.exports = {
  /**
   * @param message The message from discord
   * @param roles The raw object of the roles, in a Array.
   * @description Creates a server for the specific role name and id.
   * The @roles has to bee a Array otherwise wont work.
   */
  createChannel: (message, roles) => {
    return new Promise((resolve, reject) => {
      //has to be an array :)
      if (typeof roles != Array) {
        reject("The roles are not in a array.");
      }

      //Loop each role to make their specific channel.
      for (let i = 0; i < roles.lenght; ++i) {
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
            voiceChannel.overwritePermissions(server.roles.find("name", "@everyone"), {
              // Disallow Everyone to see, join, invite, or speak
              CREATE_INSTANT_INVITE: false,
              VIEW_CHANNEL: false,
              CONNECT: false,
              SPEAK: false,
            });

            //Make sure the ones with the roles can.
            voiceChannel.overwritePermissions(server.roles.find("id", roles[i].id), {
              //Explicitely allow the role to see, join and speak
              VIEW_CHANNEL: true,
              CONNECT: true,
              SPEAK: true,
            });
          });
      }
      resolve("The channels has been created.");
    });
  },
};

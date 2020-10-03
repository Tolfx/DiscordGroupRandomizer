module.exports = {
  /**
   * @param message The message from discord
   * @description Returns a promise.
   */
  readMembersVoice: (message) => {
    return new Promise((resolve, reject) => {
      const channel = message.member.voice.channel;
      if (!channel) {
        reject("Please join a voice channel");
      }
      let channelID = channel.id;
      let members = channel.members.map((member) => member.user);
      resolve({ channelID, members });
    });
  },
  /**
   * @param client The client of discord
   * @param message The message from discord
   * @param memberID The ID of the member
   * @param channelID The ID of the channel
   */
  moveMember: async (client, message, memberID, channelID, callback) => {
      const moveMembers = message.guild.members.cache.find((r) => r.id === memberID);
      const channel = client.channels.cache.find((r) => r.id === channelID);

      await moveMembers.voice.setChannel(channel).then(d => {
        callback(null, d)
      }).catch(er => {
        callback(new Error(er))
      })
  },

  /**
   * @param message The message from discord
   * @param memberID The ID of the member
   * @param roleID The ID of the role
   */
  giveRole: (message, memberID, roleID) => {
    return new Promise((resolve, reject) => {
      const member = message.guild.members.cache.find((r) => r.id === memberID);
      const role = message.guild.roles.cache.find((r) => r.id === roleID);

      member.roles.add(role);
    });
  },
};

module.exports = {
  /**
   * @param message The message from discord
   * @description Returns a promise.
   */
  readMembersVoice: (message) => {
    return new Promise((resolve, reject) => {
      const channel = message.member.voice.channel;
      if (!channel) {
        reject('Please join a voice channel');
      }
      let channelID = channel.id;
      let members = channel.members.map((member) => member.user);
      resolve({ channelID, members });
    });
  },

  moveMember: (client, message, memberID, channelID) => {
    return new Promise((resolve, reject) => {
      const moveMembers = message.guild.members.cache.find((r) => r.id === memberID);
      const channel = client.channels.cache.find((r) => r.id === channelID);

      moveMembers.voice.setChannel(channel);
    });
  },

  giveRole: (message, memberID, roleID) => {
    return new Promise((resolve, reject) => {
      const member = message.guild.members.cache.find((r) => r.id === memberID);
      const role = message.guild.roles.cache.find((r) => r.id === roleID);

      member.roles.add(role);
    });
  },
};

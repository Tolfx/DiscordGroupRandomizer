module.exports = {
  /**
   * @param message The message from discord
   * @param callback Returns channelID and the members. (id, member)
   */
  readMembersVoice: async (message, callback) => {
    const channel = message.member.voice.channel;
    if (!channel) {
      return callback(new Error('Please join a voice channel first.'));
    }
    let channelID = channel.id;
    let members = await channel.members.map((member) => member.user);
    return callback(channelID, members);
  },
};

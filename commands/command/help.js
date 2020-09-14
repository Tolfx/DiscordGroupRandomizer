module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Returns all commands, or one specific command info",
  run: async (client, message, args) => {
    message.channel.send("This is a help command?");
  },
};

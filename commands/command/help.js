module.exports = {
  name: "help", // <-- Always needed, the name will be used for the bot to find the command like !help.
  aliases: ["h"], //If you want to make it shorter
  description: "Returns all commands, or one specific command info", // When someone is reading this they can understand ig
  run: async (client, message, args) => { // <-- Always needed, otherwise it wont run correctly.
    message.channel.send("This is a help command?");
  },
};

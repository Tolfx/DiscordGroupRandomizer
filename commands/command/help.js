const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const _config = require("../../config.json");

module.exports = {
  name: "help", // <-- Always needed, the name will be used for the bot to find the command like !help.
  aliases: ["h"], //If you want to make it shorter
  description: "Returns all commands", // When someone is reading this they can understand ig
  run: async (client, message, args) => {
    // <-- Always needed, otherwise it wont run correctly.
    const embed = new MessageEmbed()
      .setDescription(
        stripIndent`
    **How to use**
    \`${_config.prefix}sort\` [Amount of groups]
    This command will sort every member in the voice channel and move them to the channel

    \`${_config.prefix}gather\`
    This command will gather everyone back to the main channel where you executed ${_config.prefix}sort.

    \`${_config.prefix}spread\`
    This command will spread all of the members back to their channel where they got assigned too. 

    \`${_config.prefix}clear\`
    This command will remove all of the channels and move all of the members back to the channels.
    
    **Authors**
    [Matteus W | Tolfx](https://github.com/Tolfx)
    [Niklas H](https://github.com/NiklasHj)
    [Alen M](https://github.com/ShinzenATT)
    
    [Github Repo](https://github.com/Tolfx/DiscordGroupRandomizer)`
      )
      .setColor("#333366")
      .setAuthor("Sorter", client.user.avatarURL({ format: "png", dynamic: true, size: 128 }))
      .setTimestamp();

    message.channel.send(embed);
  },
};

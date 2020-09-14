const { Client } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  disableEveryone: true,
});

client.on("ready", () => {
  console.log(
    `I'm online`,
  );
});

client.on("message", async (message) => {
  //The prefix for this bot
  const prefix = config.prefix;

  //If the bot is sending it self a message
  if (message.author.bot) return;
  //If the message wasn't from the guild (aka dm) return
  if (!message.guild) return;
  //If the messages doesnt start with prefix ignore it
  if (!message.content.startsWith(prefix)) return;

  //The args /shrug
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  //Just send a message.
  message.channel.send("This is working.");
});

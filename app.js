require('dotenv').config();
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const _config = require('./config.json');

const client = new Client({
  disableEveryone: true,
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');

['command'].forEach((handler) => {
  require(`./handler/${handler}`)(client);
});

client.on('ready', () => {
  console.log(`I'm online`);
  client.user
    .setPresence({ activity: { name: `${_config.prefix}help` }, status: 'online' })
    .then()
    .catch(console.error);
});

client.on('message', async (message) => {
  //The prefix for this bot
  const prefix = _config.prefix;

  //If the bot is sending it self a message
  if (message.author.bot) return;
  //If the message wasn't from the guild (aka dm) return
  if (!message.guild) return;
  //If the messages doesnt start with prefix ignore it
  if (!message.content.startsWith(prefix)) return;

  //The args /shrug
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  //Find what command the user is doing
  const cmd = args.shift().toLowerCase();

  //If no command return
  if (cmd.length === 0) return;

  //Find which command in the collection
  let command = client.commands.get(cmd);
  //If none then look if there is an aliases, otherwise return
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  //If the command is true, then go!
  if (command) {
    command.run(client, message, args);
  }
});
client.login(process.env.TOKEN);

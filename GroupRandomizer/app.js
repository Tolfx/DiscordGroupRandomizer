const Discord = require('discord.js')
var client = new Discord.Client()

function output(error, token) {
        if (error) {
                console.log(`There was an error logging in: ${error}`)
                return;
        } else
                console.log(`Logged in. Token: ${token}`)
}

function makeChannel(message) {
    var server = message.guild
    var name = message.author.username

    server.createChannel(name, "text")
}

client.login('mybot@example.com', 'password', output) // you seem to be missing this

makeChannel(client)
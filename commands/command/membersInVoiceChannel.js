const { readMembersVoice, moveMember, giveRole } = require("../../lib/manageMembers");
const { createChannel } = require("../../lib/manageChannels");
const { createRoles } = require("../../lib/manageServer");
const _config = require("../../config.json");
const fs = require("fs");

module.exports = {
    name: "elever",
    description: "Checks the members in the voice channel auther executed it in.",
    run: async (client, message, args) => {

        readMembersVoice(message).then(info => {
            message.channel.send(`Total \`${info.members.length}\` member(s) in this voice channel \`${info.channel.name}\` (Including the teacher(s)..)`);
        }).catch(e => {
            message.channel.send(`${e}`);
        });
    }
}
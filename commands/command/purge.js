

module.exports = {
    name: "purge",
    run: async (client, message, args) => {
        const superAdmin = require('../../lib/superAdmin')(client, message, args);

        superAdmin.purge(message, args).then((data) => 
        {
            if (data) {
                message.channel.send(`Purged ${args[0]} messages`).then((m) => m.delete({ timeout: 5000 }));
            } else {
                console.log('unknown')
            }
        }).catch(err => {
            message.channel.send(`Error: ${err}`)
        })
    }
}
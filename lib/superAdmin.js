

function purge() 
{
    return {
        /**
         * 
         * @param {any} message The message
         * @param {any[]} args The arguments
         * @returns {Promise<boolean> | Promise<string>} 
         * @description Purges a discord chat
         */
        purge: (message, args) => 
        {
            return new Promise((resolve, reject) => {
                if (!message.member.hasPermission('MANAGE_MESSAGES'))
                    return reject(`Sorry ${message.author} you dont have permission to do this`)
        
                if (!args[0])
                    return reject(`${message.author} you need a number to purge!`)
        
                if (!message.member.hasPermission('MANAGE_CHANNELS')) {
                    return reject('I do not have permissions to do this command.')

                } else {
                    message.channel.bulkDelete(args[0]).then(() => 
                    {
                        resolve(true)
                    });
                }
            })
        }
    }
}

module.exports = function superAdmin(client, message, args) {
    return {
        ...purge(message, args)
    }
}
module.exports = {
  /**
   * @param message The message from discord
   * @param {Number} amount How many roles
   * @param {Array} name The names of the roles
   */
  createRoles: (message, amount, name) => {
    return new Promise((resolve, reject) => {
      //explains it self
      /*if (typeof amount != Number) {
        reject("Amount is not a number.");
      }*/

      let roleArray = [];
      const server = message.guild;

      //Simple for loop because yeah..
      for (let i = 0; i < amount; ++i) {
        //Create a role.
        server.roles
          .create({
            data: {
              //Name it of the name.
              name: name[i],
            },
          })
          .then((roleData) => {
            //push it to an array
            roleArray.push(roleData);
            if (i + 1 === amount) {
              //Give us the roledata so we can manipulate later.
              resolve(roleArray);
            }
          });
      }
    });
  },
  /**
   * @param message The message from discord
   * @param {Array} id The ID of the channel.
   */
  removeRoles: (message, id) => {
    return new Promise((resolve, reject) => {
      const role = message.guild.roles;

      for (let i = 0; i < id.length; ++i) {
        let roleDelete = role.cache.find((r) => r.id === id[i]);
        if (typeof channelDelete === undefined) {
          return reject(`The role seems to be deleted already. Can't find it`);
        }
        roleDelete.delete();
      }
    });
  },
};

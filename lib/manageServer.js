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

      console.log(amount);

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
};

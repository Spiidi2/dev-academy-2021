module.exports = (sequelize, type) => {
    return sequelize.define("names", {
       name: {
          type: type.STRING,
          allowNull: false,
       },
       amount: {
          type: type.INTEGER,
          allowNull: true,
       },
    });
 };
 
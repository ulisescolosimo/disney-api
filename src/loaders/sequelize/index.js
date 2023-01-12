const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("alkemy", "root", "root", {
  host: "localhost",
  dialect: "mariadb",
});

module.exports = sequelize;

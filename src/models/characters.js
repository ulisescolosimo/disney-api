const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Character = sequelize.define(
  "Characters",
  {
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER(50),
      allowNull: true,
    },
    history: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER(50),
      allowNull: false,
    }
  },
  {}
);

module.exports = Character;

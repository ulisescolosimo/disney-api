const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");

const GenderType = sequelize.define(
  "GenderType",
  {
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {}
);

GenderType.belongsToMany =
  (Movie,
  {
    sourceKey: "id",
    foreignKey: "genderTypeId",
  });

module.exports = GenderType;

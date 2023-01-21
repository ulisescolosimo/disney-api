const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");

const ContentType = sequelize.define(
  "ContentType",
  {
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {}
);

module.exports = ContentType;

ContentType.belongsToMany =
  (Movie,
  {
    as: "movies",
    foreignKey: "contentTypeId",
  });

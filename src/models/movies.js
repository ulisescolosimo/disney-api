const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const ContentType = require("./contentTypes");
const GenderType = require("./genderTypes");

const Movie = sequelize.define(
  "Movies",
  {
    image: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    calification: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  {}
);

module.exports = Movie;

Movie.belongsTo(ContentType, {
  as: "contentType",
  foreignKey: "contentTypeId",
});

Movie.belongsTo(GenderType, {
  as: "genderType",
  foreignKey: "genderTypeId",
});

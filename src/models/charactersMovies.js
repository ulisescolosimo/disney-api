const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");
const Character = require("./characters");

const CharactersMovies = sequelize.define(
  "charactersMovies",
  {},
  { timestamps: false }
);

Movie.belongsToMany(Character, {
  through: CharactersMovies,
  as: "character",
  foreignKey: "movieId",
});
Character.belongsToMany(Movie, {
  through: CharactersMovies,
  as: "movies",
  foreignKey: "characterId",
});

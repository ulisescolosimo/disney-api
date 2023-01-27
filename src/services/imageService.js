const ImageRepository = require("../repositories/imageRepository");
const CharacterRepository = require("../repositories/characterRepository");
const MoviesRepository = require("../repositories/movieRepository");

const characterRepository = new CharacterRepository();
const movieRepository = new MoviesRepository();
const imageRepository = new ImageRepository();

const uploadCharacterImage = async (idCharacter, file) => {
  const character = await characterRepository.findById(idCharacter);
  const imgURL = await imageRepository.uploadImage(character.name, file.buffer, file.mimetype);
  character.image = imgURL;
  return await characterRepository.update(idCharacter, { image: imgURL});
};

const uploadMovieImage = async (idMovie, file) => {
  const movie = await movieRepository.findById(idMovie);
  const imgURL = await imageRepository.uploadImage(movie.title, file.buffer, file.mimetype);
  movie.image = imgURL;
  return movieRepository.update(idMovie, { image: imgURL});
};

module.exports = { uploadCharacterImage, uploadMovieImage };

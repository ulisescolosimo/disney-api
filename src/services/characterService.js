const CharacterRepository = require("../repositories/characterRepository");
const ImageRepository = require("../repositories/imageRepository");
const characterRepository = new CharacterRepository();
const imageRepository = new ImageRepository();

const findByIdWithMovies = async (id) => {
  return await characterRepository.findByIdWithMovies(id);
};

const findByName = async (name) => {
  return await characterRepository.findByName(name);
};

const findAll = async (filter, options) => {
  return await characterRepository.findAll(filter, options);
};

const save = async (character, movieId) => {
  return await characterRepository.save(character, movieId);
};

const update = async (id, character) => {
  return await characterRepository.update(id, character);
};

const remove = async (id) => {
  const character = await characterRepository.findById(id);
  console.log('Character: ', character);
  await imageRepository.removeImage(character.image);
  return await characterRepository.remove(id);
};

const asociate = async (idCharacter, idMovie) => {
  await idCharacter.addMovie(idMovie);
};

module.exports = {
  findByIdWithMovies,
  findByName,
  findAll,
  save,
  update,
  remove,
  asociate
};

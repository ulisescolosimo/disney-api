const MovieRepository = require("../repositories/movieRepository");
const CharacterRepository = require("../repositories/characterRepository");
const GenderTypeRepository = require("../repositories/genderTypeRepository");
const ContentTypeRepository = require("../repositories/contentTypeRepository");
const ImageRepository = require("../repositories/imageRepository");
const movieRepository = new MovieRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();
const imageRepository = new ImageRepository();
const characterRepository = new CharacterRepository();

const findByIdWithCharacters = async (id) => {
  return await movieRepository.findByIdWithCharacters(id);
};

const findByTitle = async (title) => {
  return await movieRepository.findByTitle(title);
};

const findAll = async (filter, options) => {
  return await movieRepository.findAll(filter, options);
};

const save = async (movie) => {
  const genderType = await genderTypeRepository.findByDescription(
    movie.genderType
  );
  const contentTypes = await contentTypeRepository.findByDescription(
    movie.contentType
  );
  movie.genderTypeId = genderType.dataValues.id;
  movie.contentTypeId = contentTypes.dataValues.id;
  return await movieRepository.save(movie);
};

const update = async (id, movie) => {
  if (movie.genderType) {
    const genderType = await genderTypeRepository.findByDescription(
      movie.genderType
    );
    movie.genderTypeId = genderType.id;
  }

  if (movie.contentType) {
    const contentType = await contentTypeRepository.findByDescription(
      movie.contentType
    );
    movie.contentTypeId = contentType.id;
  }

  return await movieRepository.update(id, movie);
};

const remove = async (id) => {
  const movie = await movieRepository.findByIdWithCharacters(id);
  await imageRepository.removeImage(movie.image);
  return await movieRepository.remove(id);
};

const asociate = async (idMovie, idCharacter) => {
  const movie = await movieRepository.findByIdWithCharacters(idMovie);
  const character = await characterRepository.findById(idCharacter);
  await movie.addCharacter(character);
};

module.exports = {
  findByTitle,
  findAll,
  save,
  update,
  remove,
  asociate,
  findByIdWithCharacters
};

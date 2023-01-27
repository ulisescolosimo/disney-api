const { Op } = require("sequelize");
const Character = require("../models/characters");
const Movie = require("../models/movies");

class CharacterRepository {
  constructor() {}

  async findByIdWithMovies(id) {
    return await Character.findOne({
      where: { id },
      include: [
        {
          model: Movie,
          as: "movies"
        },
      ],
      attributes: ['id', 'name', 'age', 'weight', 'history']
    });
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async findAll({ name, age, weight }, { limit, offset, order }) {
    let where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (age) {
      where.age = {
        [Op.eq]: age,
      };
    }

    if (weight) {
      where.weight = {
        [Op.eq]: weight,
      };
    }

    return await Character.findAll({ where, attributes: ["image", "name"] });
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async save(character, movieId) {
    const newCharacter = await Character.create(character);
    const movie = await Movie.findByPk(movieId);
    await newCharacter.setMovies(movie);
    return newCharacter;
  }

  async update(id, character) {
    return await Character.update(character, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await Character.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CharacterRepository;

const Movie = require("../models/movies");
const Character = require("../models/characters");
const { Op } = require("sequelize");
const GenderType = require("../models/genderTypes");
const ContentType = require("../models/contentTypes");

class MovieRepository {
  constructor() {}

  async findByIdWithCharacters(id) {
    return await Movie.findOne({
      where: { id },
      include: [
        {
          model: Character,
          as: "character",
        },
        {
          model: ContentType,
          as: "type",
          attributes: ['id', 'description']
        },
        {
          model: GenderType,
          as: "gender",
          attributes: ['id', 'description']
        }
      ],
      attributes: ['id', 'title', 'image', 'creationDate', 'calification']
    });
  }

  async findByName(name) {
    return await Movie.findOne({ where: { name } });
  }

  async findByTitle(title) {
    return await Movie.findOne({ where: { title } });
  }

  async findAll(
    { title, creationDate, calification },
    { limit, offset, order }
  ) {
    let where = {};

    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }

    if (calification) {
      where.calification = {
        [Op.eq]: calification,
      };
    }

    if (creationDate) {
      where.creationDate = {
        [Op.eq]: creationDate,
      };
    }

    let config = {
      where,
      attributes: ["title", "creationDate", "image"],
    };

    if (order) {
      config.order = [order.split(";")];
    }

    return await Movie.findAll(config);
  }

  async findByName(name) {
    return await Movie.findByName({ where: { name } });
  }

  async save(movie) {
    return await Movie.create(movie);
  }

  async update(id, movie) {
    return await Movie.update(movie, {
      where: {
        id,
      },
    });
  }

  async remove(id) {
    return await Movie.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MovieRepository;

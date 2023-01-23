const { Op } = require("sequelize");
const Character = require("../models/characters");

class CharacterRepository {
  constructor() {}

  /* TODO: implementar filtro busqueda query */

  async findById(id) {
    return await Character.findOne({ where: { id } });
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async findAll({ name, age, weight, movieTitle }, { limit, offset, order }) {
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

    return await Character.findAll({ where });
  }

  async findByName(name) {
    return await Character.findOne({ where: { name } });
  }

  async save(character) {
    return await Character.create(character);
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

const CharacterRepository = require("../repositories/characterRepository");
const repository = new CharacterRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findByName = async (name) => {
  return await repository.findByName(name);
};

const findAll = async () => {
  return await repository.findAll();
};

const save = async (character) => {
  return await repository.save(character);
};

const update = async (id, character) => {
  return await repository.update(id, character);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  findById,
  findByName,
  findAll,
  save,
  update,
  remove,
};

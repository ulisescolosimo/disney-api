const bcrypt = require("bcrypt");
const GenderTypes = require("../models/genderTypes");

class GenderTypeRepository {
  constructor() {}

  async findById(id) {
    return await GenderTypes.findById(id);
  }

  async findByDescription(description) {
    return await GenderTypes.findOne({
      where: {
        description,
      },
    });
  }
}

module.exports = GenderTypeRepository;

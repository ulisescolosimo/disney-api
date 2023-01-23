const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const userService = require("../../services/userService");
const { ROLES, ADMIN_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth");
const characterService = require("../../services/characterService");

const _nameRequired = check("name", "Name required").not().isEmpty();
const _lastNameRequired = check("lastName", "Last Name required")
  .not()
  .isEmpty();
const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email is invalid").isEmail();
const _emailExist = check("email").custom(async (email = "") => {
  const userFound = await userService.findByEmail(email);
  if (userFound) {
    throw new AppError("Email already exist in DB", 400);
  }
});
const _optionalEmailValid = check("email", "Email is invalid")
  .optional()
  .isEmail();
const _optionalEmailExist = check("email")
  .optional()
  .custom(async (email = "") => {
    const userFound = await userService.findByEmail(email);
    if (userFound) {
      throw new AppError("Email already exist in DB", 400);
    }
  });
const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });
const _dateValid = check("birthdate").optional().isDate("MM-DD-YYYY");

const _idRequied = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const charFound = await characterService.findById(id);
  if (!charFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _historyRequired = check("history").notEmpty();
const _ageIsNumeric = check("age").optional().isNumeric();
const _weightIsNumeric = check("weight").optional().isNumeric();

const _nameNotExist = check("name").custom(async (name = "") => {
  const charFound = await characterService.findByName(name);
  if (!charFound) {
    throw new AppError("The name does not exist in DB", 400);
  }
});

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _ageIsNumeric,
  _historyRequired,
  _weightIsNumeric,
  validationResult,
  _nameNotExist,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _ageIsNumeric,
  _idExist,
  _weightIsNumeric,
  _roleValid,
  validationResult,
  _nameNotExist,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequied,
  _idIsNumeric,
  _idExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
};

const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");
const characterService = require("../../services/characterService");
const movieService = require("../../services/movieService");
const multer = require("multer");
const upload = multer();

const _nameRequired = check("name", "Name required").not().isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

const _idRequied = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();
const _idExist = check("id").custom(async (id = "") => {
  const charFound = await characterService.findByIdWithMovies(id);
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

const _idCharacterExist = check("idCharacter").custom(
  async (idCharacter = '', {req}) => {
    const characterFound = await characterService.findByIdWithMovies(idCharacter);
    if(!characterFound) {
      throw new AppError('The character id does not exist in DB', 400);
    }
    req.character = characterFound
  }
);

const _idMovieExist = check("idMovie").custom(
  async (idMovie = '', {req}) => {
    const movieFound = await movieService.findByIdWithCharacters(idMovie);
    if(!movieFound) {
      throw new AppError('The movie id does not exist in DB', 400);
    }
    req.movie = movieFound
  }
);

const validationAsociation = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idCharacterExist,
  _idMovieExist,
  validationResult
];

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

const postImageRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  upload.single("image"),
  _idRequied,
  _idIsNumeric,
  _idExist,
  imageRequired,
  validationResult
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  validationAsociation
};

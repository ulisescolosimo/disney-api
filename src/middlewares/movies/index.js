const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const userService = require("../../services/userService");
const { ROLES, ADMIN_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth");
const movieService = require("../../services/movieService");
const ContentTypeRepository = require("../../repositories/contentTypeRepository");
const GenderTypeRepository = require("../../repositories/genderTypeRepository");
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

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
  const charFound = await movieService.findById(id);
  if (!charFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _titleOptional = check("title").optional();
const _titleRequired = check("title", "Title Required").not().isEmpty();
const _titleNotExists = check("title").custom(async (title = "") => {
  const mFound = await movieService.findByTitle(title);
  if (mFound) {
    throw new AppError("The title exists in the database", 400);
  }
});

const _creationDateIsDate = check("creationDate").isDate();
const _creationDateRequired = check("creationDate").not().isEmpty();
const _calificationIsNumeric = check("calification").isNumeric();
const _calificationRequired = check("calification").not().isEmpty();

const _contentTypeExistValidation = async (contentType = "") => {
  const contentTypeFound = await contentTypeRepository.findByDescription(
    contentType
  );
  if (!contentTypeFound) {
    throw new AppError("The content type does not exists in the database", 400);
  }
};

const _genderTypeExistValidation = async (genderType = "") => {
  const genderTypeFound = await genderTypeRepository.findByDescription(
    genderType
  );
  if (!genderTypeFound) {
    throw new AppError("The gender type does not exists in the database", 400);
  }
};

const _contentTypeExist = check("contentType").custom(
  _contentTypeExistValidation
);
const _genderTypeExist = check("genderType").custom(_genderTypeExistValidation);
const _contentTypeExistAndOptional = check("contentType")
  .optional()
  .custom(_contentTypeExistValidation);
const _genderTypeExistAndOptional = check("genderType")
  .optional()
  .custom(_genderTypeExistValidation);

const _creationDateIsDateAndOptional = check("creationDate")
  .isDate()
  .optional();

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleNotExists,
  _contentTypeExist,
  _genderTypeExist,
  _creationDateRequired,
  _creationDateIsDate,
  _calificationRequired,
  _calificationIsNumeric,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _idIsNumeric,
  _idExist,
  _titleOptional,
  _contentTypeExistAndOptional,
  _genderTypeExistAndOptional,
  _titleNotExists,
  _creationDateIsDateAndOptional,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _idExist,
  _idIsNumeric,
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

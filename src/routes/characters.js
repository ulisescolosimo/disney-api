const { Router } = require("express");


const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getCharacterById,
  deleteCharacter,
  uploadCharacterImage,
  asociateMovie,
} = require("../controllers/characters");

const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  validationAsociation
} = require("../middlewares/characters");

const router = Router();

router.get("/", getAllRequestValidation, getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id", putRequestValidations, updateCharacter);
router.put("/:idCharacter/movies/:idMovie", validationAsociation, asociateMovie)
router.get("/:id", getRequestValidation, getCharacterById);
router.delete("/:id", deleteRequestValidations, deleteCharacter);
router.post("/image", postImageRequestValidations, uploadCharacterImage)

module.exports = router;

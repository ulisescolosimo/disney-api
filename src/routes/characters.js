const { Router } = require("express");
const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getCharacterById,
  deleteCharacter,
} = require("../controllers/characters");

const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/characters");

const router = Router();

router.get("/", getAllRequestValidation, getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id", putRequestValidations, updateCharacter);
router.get("/:id", getRequestValidation, getCharacterById);
router.delete("/:id", deleteRequestValidations, deleteCharacter);

module.exports = router;

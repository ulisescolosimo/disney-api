const { Router } = require("express");
const {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getById,
  deleteCharacters,
} = require("../controllers/characters");

const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/characters");

const router = Router();

router.get("/", getAllCharacters);
router.post("/", postRequestValidations, createCharacter);
router.put("/:id", putRequestValidations, updateCharacter);
/* router.get("/:id", getById);
router.delete("/:id", deleteCharacters); */

module.exports = router;

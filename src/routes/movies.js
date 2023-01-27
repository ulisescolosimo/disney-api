const { Router } = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
  uploadMovieImage,
  asociateCharacter
} = require("../controllers/movies");

const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidation,
  validationAsociation,
} = require("../middlewares/movies");

const router = Router();

router.get("/", getAllRequestValidation, getAllMovies);
router.post("/", postRequestValidations, createMovie);
router.put("/:idMovie/characters/:idCharacter", validationAsociation, asociateCharacter)
router.put("/:id", putRequestValidations, updateMovie);
router.get("/:id", getRequestValidation, getMovieById);
router.delete("/:id", deleteRequestValidations, deleteMovie);
router.post("/image", postImageRequestValidation, uploadMovieImage)

module.exports = router;

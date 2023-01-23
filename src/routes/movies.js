const { Router } = require("express");
const {
  getAllMovies,
  createMovie,
  updateMovie,
  getMovieById,
  deleteMovie,
} = require("../controllers/movies");

const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
} = require("../middlewares/movies/index");

const router = Router();

router.get("/", getAllRequestValidation, getAllMovies);
router.post("/", postRequestValidations, createMovie);
router.put("/:id", putRequestValidations, updateMovie);
router.get("/:id", getRequestValidation, getMovieById);
router.delete("/:id", deleteRequestValidations, deleteMovie);

module.exports = router;

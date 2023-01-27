const express = require("express");
const characterService = require("../services/characterService");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");
const imageService = require("../services/imageService");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllCharacters = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));

    const { filter = "", options = "" } = req.query;

    const characters = await characterService.findAll(filter, options);
    res.json(new Success(characters));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createCharacter = async (req, res, next) => {
  try {
    let character = req.body;
    character = await characterService.save(character);

    res.status(201).json(new Success(character));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    let char = req.body;
    const charUpdated = await characterService.update(id, char);
    res.json(new Success(charUpdated));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getCharacterById = async (req, res) => {
  try {
    const user = await characterService.findByIdWithMovies(req.params.id);
    res.json(new Success(user));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await characterService.remove(id);
    res.json(new Success(user));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

const uploadCharacterImage = async (req, res, next) => {
  try {
    const characterId = req.body.id;
    const image = req.file;

    res.json(new Success(await imageService.uploadCharacterImage(characterId, image)));
  } catch (err) {
    next(err);
  }
};

const asociateMovie = async (req, res, next) => {
  try {
    const character = req.character;
    const movie = req.movie;
    console.log(character)
    console.log(movie)
    await characterService.asociate(character, movie);

    res.json(new Success());
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  getCharacterById,
  deleteCharacter,
  uploadCharacterImage,
  asociateMovie
};

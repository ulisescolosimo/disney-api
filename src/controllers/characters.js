const express = require("express");
const characterService = require("../services/characterService");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllCharacters = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));

    const characters = await characterService.findAll(
      req.query.filter,
      req.query.options
    );
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
/* const getById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
}; */

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
/* const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userService.remove(id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
}; */

module.exports = {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  /*getById,
    deleteUser */
};

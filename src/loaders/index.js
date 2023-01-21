const ExpressServer = require("./server/expressServer");
const sequelize = require("./sequelize");
const config = require("../config");
const logger = require("./logger");

module.exports = async () => {
  try {
    await sequelize.authenticate();
    require("../models/movies");
    require("../models/characters");
    require("../models/genderTypes");
    require("../models/contentTypes");
    require("../models/charactersMovies");
    sequelize.sync({ force: false });
    /* sequelize.sync({ force: true }); */
    console.log("Connection has been established successfully.");

    const server = new ExpressServer();
    logger.info("Express Loaded");

    server.start();
    logger.info(`#######################################
      Server listening on port: ${config.port}
      #######################################
    `);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

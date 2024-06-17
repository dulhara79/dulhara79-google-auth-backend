import mongoose from "mongoose";
import config from "../configs/index";
import logger from "../util/logger";

let database;

const connect = async () => {
  const MONGODB_URL = config.DB_CONNECTION_STRING;

  if (database) return;

  mongoose
    .connect(MONGODB_URL)
    .then((connection) => {
      database = connection;
      logger.info("Database connection successful");
    })
    .catch((error) => {
      logger.error(`Error connecting to database: ${error}`);
      console.log(error);
    });
};

export { connect };

//------------------------------------------------

/* 
import mongoose from "mongoose";
import config from "../configs";
import logger from "../util/logger";

let database;

const connect = async () => {
  const MONGODB_URL = config.DB_CONNECTION_STRING;

  if (database) return;

  if (!MONGODB_URL) {
    logger.error("MONGODB_URL is not defined. Check your environment variables.");
    console.log('MONGODB_URL is undefined:', MONGODB_URL); // Debug log
    return;
  }

  console.log('MONGODB_URL:', MONGODB_URL); // Debug log

  mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) => {
      database = connection;
      logger.info("Database connection successful");
    })
    .catch((error) => {
      logger.error(`Error connecting to database: ${error}`);
    });
}

export { connect };
 */

const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("Couldn't find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  api: {
    prefix: "/api/v1",
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
  swagger: {
    path: "/documentation",
  },
  database: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    ttl: process.env.AUTH_TTL,
  },
  aws: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    privateAccessKey: process.env.PRIVATE_ACCESS_KEY,
    s3BucketName: process.env.S3_BUCKET_NAME
  }
};

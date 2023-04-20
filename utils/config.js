const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const DEBUG_MODE = process.env.DEBUG_MODE === "1" ? true : false;

module.exports = {
  PORT,
  MONGODB_URI,
  DEBUG_MODE,
};

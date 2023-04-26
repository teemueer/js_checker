const config = require("../utils/config");
const mongoose = require("mongoose");

// Connect to the database
const connect = async () => {
  try {
    const connection = await mongoose.connect(config.MONGODB_URI, {
      autoIndex: true,
    });
    console.log("Connected to MongoDB", config.MONGODB_URI);
    return connection;
  } catch (error) {
    console.error("MongoDB:" + error.message);
  }
};

// Disconnect from the database
const disconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("MongoDB:", error.message);
  }
};

module.exports = {
  connect,
  disconnect,
};

const config = require("../utils/config");
const mongoose = require("mongoose");
const Test = require("./models/test");

/*
    TODO:
*/

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

/*
//Function to create a new test.
async function createTest() {
  try {
    const test = await Tests.create({
      name: "m1-t2",
      prompts: ["Teemu"],
      elements: [{ name: "body", innerHTML: "Teemu" }],
      atest: "Does this work?",
    });
    await test.save();
  } catch (error) {
    console.log("Error while creating test!:" + error.message);
  }
}

async function getTest(name) {
  try {
    const result = await Test.find({ name: name }, { _id: 0, __v: 0, name: 0 });
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllTests() {
  try {
    const result = await Test.find();
    console.log(result);
    return result;
  } catch (error) {
    console.log("ERROR: " + error.message);
  }
}

async function closeConnection() {
  await mongoose.connection.close();
}
*/

module.exports = {
  connect,
  disconnect,
  //getTest,
  //createTest,
  //closeConnection,
  //getAllTests,
};

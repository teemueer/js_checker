const mongoose = require("mongoose");
const Test = require("./models/Test");
require("dotenv").config({ path: "../.env" });
const uri = process.env.MONGODB;
const Tests = require("./models/Test");

/*
    TODO:
*/

//Connect to the database
const mongoConnect = async () => {
  try {
    const connection = await mongoose.connect(uri);
    return connection;
  } catch (error) {
    console.log("DB:" + error.message);
  }
};

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

module.exports = {
  mongoConnect,
  getTest,
  createTest,
  closeConnection,
  getAllTests,
};

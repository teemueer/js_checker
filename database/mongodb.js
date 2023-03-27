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
    console.log(uri);
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
    });
    await test.save();
  } catch (error) {
    console.log("Error while creating test!:" + error.message);
  }
}

mongoConnect();
createTest();

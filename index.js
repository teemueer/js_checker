const app = require("./app");
const port = process.env.PORT || 3000;
const database = require("./database/mongodb");

async () => {
  try {
    await database.mongoConnect();
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.log(error.message);
  }
};

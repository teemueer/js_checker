const app = require("./app");
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
const main = async (url, jsonFilepath) => {
  const data = fs.readFileSync(jsonFilepath, "utf-8");
  const json = await JSON.parse(data);

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const parser = new Parser(page, json);
  await parser.parse();

  await keypress();
  await browser.close();

  return parser.results;
};

const url =
  "http://users.metropolia.fi/~teemueer/assignments/module1/03/03.html";
const jsonFilepath = "./json/module1/03.json";

main(url, jsonFilepath).then(process.exit);
*/

import puppeteer from "puppeteer";
import fs from "fs";

class Parser {
  constructor(page) {
    this.page = page;
  }

  async getElements(css) {
    // wait for the element to be visible
    await this.page.waitForSelector(css);
    // return list of elements matching the css selector
    return await this.page.$$(css);
  }

  async getElementText(element) {
    return await this.page.evaluate((element) => element.textContent, element);
  }

  async getElementAttribute(element, attr) {
    return await this.page.evaluate(
      (element, attr) => element.getAttribute(attr),
      element,
      attr
    );
  }

  async clickElement(element) {
    await this.page.evaluate((element) => element.click(), element);
  }

  async parse(objects, path = []) {
    for (const obj of objects) {
      // wait for a while for debugging
      await this.page.waitForTimeout(500);
      // keep track of nested elements
      const currentPath = [...path, obj];
      // css selector path
      const css = currentPath.map((obj) => obj.name).join(" ");
      // elements on page matching the css selector
      const elements = await this.getElements(css);

      if (elements.length) {
        console.log("PASS", css);
      } else {
        console.log("FAIL", css);
      }

      if (obj.attrs) {
        for (const [key, value] of Object.entries(obj.attrs)) {
          const attr = await this.getElementAttribute(elements[0], key);
          if ((typeof value === "boolean" && attr) || attr == value) {
            console.log("PASS", css, `: ${key} == ${attr}`);
          } else {
            console.log("FAIL", css, `: ${key} == ${attr} instead of ${value}`);
          }
        }
      }

      if (obj.action) {
        if (obj.action == "click") {
          console.log("*** DEBUG", "click!");
          await this.clickElement(elements[0]);
        }
      }

      if (obj.children) {
        await this.parse(obj.children, currentPath);
      }
    }
  }
}

const keypress = async () => {
  console.log("print any key to continue");
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

const test = async (url, jsonFilepath) => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const parser = new Parser(page);

  const data = fs.readFileSync(jsonFilepath, "utf-8");
  const objects = await JSON.parse(data);

  await parser.parse(objects);

  await keypress();
  await browser.close();
};

const url =
  "http://users.metropolia.fi/~teemueer/assignments/module3/t11/11.html";
const jsonFilepath = "./json/module3/11.json";

test(url, jsonFilepath).then(process.exit);

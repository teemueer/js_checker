const puppeteer = require("puppeteer");
const axios = require("axios");

const hurr = async () => {
  const browser = await puppeteer.launch({
    //headless: false,
    args: ["--no-sandbox"],
  });

  const [page] = await browser.pages();

  page.on("dialog", async (dialog) => {
    const type = dialog.type();
    await dialog.accept();
  });

  const url =
    "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%207/assignment7.html";

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const scripts = await page.$$("script");
  for (const script of scripts) {
    const src = await page.evaluate((script) => script.src, script);
    const res = await axios.get(src);

    //\s*\w+\s*[<>=!]+\s*\d+\s*;\s*\w+\s*[+\-]*=\s*\d+\s*\)
    const _regex = /for\s*\(\s*let\s+\w+\s*=\s*\d+\s*;\s*\w+\s*\<\s*\w+\s*;/g;

    const regex =
      /for\s*\(.*;.*;.*\)/g;

    m = res.data.match(regex);
    console.log(m);
  }

  //await page.waitForTimeout(1000);

  await browser.close();
};

hurr();

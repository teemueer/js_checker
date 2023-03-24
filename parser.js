class Parser {
  constructor(page, json) {
    this.page = page;
    this.json = json;
    this.results = [];

    this.promptCount = 0;
    this.page.on("dialog", async (dialog) => {
      const promptValue = this.json.prompts[this.promptCount++];
      await dialog.accept(promptValue);
    });
  }

  async getElements(css) {
    try {
      // wait for the element to be visible
      await this.page.waitForSelector(css);
      // return list of elements matching the css selector
      return await this.page.$$(css);
    } catch (e) {
      return [];
    }
  }

  async getElementAttribute(element, attr) {
    return await this.page.evaluate(
      (element, attr) => element.getAttribute(attr),
      element,
      attr
    );
  }

  async getElementText(element) {
    return await this.page.evaluate((element) => element.textContent, element);
  }

  async clickElement(element) {
    await this.page.evaluate((element) => element.click(), element);
  }

  async parse(objects = this.json.elements, path = []) {
    for (const obj of objects) {
      // wait for a while for debugging
      //await this.page.waitForTimeout(200);
      // keep track of nested elements
      const currentPath = [...path, obj];
      // css selector path
      const css = currentPath.map((obj) => obj.name).join(" ");
      // elements on page matching the css selector
      const elements = await this.getElements(css);

      this.results.push({
        description: `${css} was found`,
        result: elements.length ? "PASS" : "FAIL",
      });

      if (!elements.length) continue;

      const element = elements[0];

      if (obj.attrs) {
        for (const [key, value] of Object.entries(obj.attrs)) {
          const attr = await this.getElementAttribute(element, key);
          this.results.push({
            description: `${css}[${key}] = ${value}`,
            result:
              (typeof value === "boolean" && attr) || attr == value
                ? "PASS"
                : "FAIL",
          });
        }
      }

      if (obj.innerHTML) {
        const innerHTML = (await this.getElementText(element)).toString();
        this.results.push({
          description: `${css}.innerHTML contains ${obj.innerHTML}`,
          result: innerHTML.includes(obj.innerHTML) ? "PASS" : "FAIL",
        });
      }

      if (obj.action) {
        if (obj.action == "click") {
          await this.clickElement(element);
        }
      }

      if (obj.children) {
        await this.parse(obj.children, currentPath);
      }
    }

    return this.results;
  }
}

module.exports = Parser;

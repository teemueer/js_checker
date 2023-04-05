class Parser {
  constructor(page, assignment) {
    this.page = page;

    this.objects = assignment.items.filter(
      (assg) => assg.type === "element" || assg.type === "reload"
    );

    this.prompts = assignment.items.filter((assg) => assg.type === "prompt");
    this.promptCount = 0;

    this.page.on("dialog", async (dialog) => {
      const type = dialog.type();
      if (type == "confirm") {
        await dialog.accept();
      } else {
        const promptValue = this.prompts[this.promptCount++].value;
        await dialog.accept(promptValue);
      }
    });

    this.results = [];
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

  async parse(objects = this.objects, path = []) {
    for (const obj of objects) {
      // wait for a while for debugging
      //await this.page.waitForTimeout(200);

      if (obj.type === "reload") {
        await this.page.reload();
        continue;
      }

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
        for (const attr of obj.attrs) {
          const realAttr = await this.getElementAttribute(element, attr.name);
          this.results.push({
            description: `${css}[${attr.name}] = ${realAttr}`,
            result:
              (typeof realAttr === "boolean" && attr.value) ||
              realAttr == attr.value
                ? "PASS"
                : "FAIL",
          });
        }
      }

      if (obj.texts) {
        const realText = await this.getElementText(element);
        for (const text of obj.texts) {
          const regex = new RegExp(text, "i");
          this.results.push({
            description: `${css} contains ${text}`,
            result: realText.match(regex) ? "PASS" : "FAIL",
          });
        }
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

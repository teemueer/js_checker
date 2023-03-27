const app = require("./app");
const supertest = require("supertest");

const api = supertest(app);

describe("test with working solution", () => {
  it("m1-02", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/02/02.html",
      exercise: "m1-02",
    };
    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/03/03.html",
      exercise: "m1-03",
    };

    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module3/t11/11.html",
      exercise: "m3-11",
    };

    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });
});

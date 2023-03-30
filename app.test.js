const database = require("./database/db");
const app = require("./app");
const supertest = require("supertest");

const api = supertest(app);

describe("test with working solution", () => {
  it("m1-02", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/02/02.html",
    };
    const res = await api.post("/api/test/m1-02").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/03/03.html",
    };

    const res = await api.post("/api/test/m1-03").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module3/t11/11.html",
    };

    const res = await api.post("/api/test/m3-11").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%204/assignment4.html",
    };
    const res = await api.post("/api/test/m1-04").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%205/assignment5.html",
    };
    const res = await api.post("/api/test/m1-05").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%206/assignment6.html",
    };
    const res = await api.post("/api/test/m1-06").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  afterAll(async () => {
    await database.disconnect();
  });
});

const app = require("./app");
const supertest = require("supertest");
const api = supertest(app);
const database = require("./database/mongodb");

describe("test with working solution", () => {
  it("m1-02", async () => {
    database.mongoConnect();
    const a = await database.getTest("m1-02");
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/02/02.html",
      exercise: "m1-02",
      test: a,
    };
    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    database.mongoConnect();
    const a = await database.getTest("m1-03");
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module1/03/03.html",
      exercise: "m1-03",
      test: a,
    };

    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    database.mongoConnect();
    const a = await database.getTest("m3-11");
    const data = {
      url: "http://users.metropolia.fi/~teemueer/assignments/module3/t11/11.html",
      exercise: "m3-11",
      test: a,
    };

    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-04", async () => {
    database.mongoConnect();
    const a = await database.getTest("m1-04");
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%204/assignment4.html",
      exercise: "m1-04",
      test: a,
    };
    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-05", async () => {
    database.mongoConnect();
    const a = await database.getTest("m1-05");
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%205/assignment5.html",
      exercise: "m1-05",
      test: a,
    };
    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-06", async () => {
    database.mongoConnect();
    const a = await database.getTest("m1-06");
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%206/assignment6.html",
      exercise: "m1-06",
      test: a,
    };
    const res = await api.post("/test").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });
});

const database = require("./database/db");
const app = require("./app");
const supertest = require("supertest");

const api = supertest(app);

// 15 second timeout
jest.setTimeout(15000);

describe("Working solutions", () => {
  it("m1-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-01",
    };
    const res = await api.post("/api/assignments/m1-01").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-02",
    };
    const res = await api.post("/api/assignments/m1-02").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-03",
    };

    const res = await api.post("/api/assignments/m1-03").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%204/assignment4.html",
    };
    const res = await api.post("/api/assignments/m1-04").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%205/assignment5.html",
    };
    const res = await api.post("/api/assignments/m1-05").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%206/assignment6.html",
    };
    const res = await api.post("/api/assignments/m1-06").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%207/assignment7.html",
    };
    const res = await api.post("/api/assignments/m1-07").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%208/assignment8.html",
    };
    const res = await api.post("/api/assignments/m1-08").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%209/assignment9.html",
    };
    const res = await api.post("/api/assignments/m1-09").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-01",
    };
    const res = await api.post("/api/assignments/m2-01").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-02",
    };
    const res = await api.post("/api/assignments/m2-02").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-03",
    };

    const res = await api.post("/api/assignments/m2-03").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-04",
    };

    const res = await api.post("/api/assignments/m2-04").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-05",
    };

    const res = await api.post("/api/assignments/m2-05").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-06",
    };

    const res = await api.post("/api/assignments/m2-06").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-07",
    };

    const res = await api.post("/api/assignments/m2-07").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  /*
  it("m2-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-08",
    };

    const res = await api.post("/api/assignment/m2-08").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });
  */

  /*
  it("m2-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-09",
    };

    const res = await api.post("/api/assignment/m2-09").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });
  */

  it("m2-10", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-10",
    };

    const res = await api.post("/api/assignments/m2-10").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-01",
    };
    const res = await api.post("/api/assignments/m3-01").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-02",
    };
    const res = await api.post("/api/assignments/m3-02").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-03",
    };

    const res = await api.post("/api/assignments/m3-03").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-04",
    };

    const res = await api.post("/api/assignments/m3-04").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-05",
    };

    const res = await api.post("/api/assignments/m3-05").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  /*
  it("m3-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-06",
    };

    const res = await api.post("/api/assignment/m3-06").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });
  */

  it("m3-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-07",
    };

    const res = await api.post("/api/assignments/m3-07").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-08",
    };

    const res = await api.post("/api/assignments/m3-08").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-09",
    };

    const res = await api.post("/api/assignments/m3-09").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-10", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-10",
    };

    const res = await api.post("/api/assignments/m3-10").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-11",
    };

    const res = await api.post("/api/assignments/m3-11").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("tvmaze", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/tvmaze",
    };

    const res = await api.post("/api/assignments/tvmaze").send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  afterAll(async () => {
    await database.disconnect();
  });
});

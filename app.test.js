const database = require("./database/db");
const app = require("./app");
const supertest = require("supertest");
const { beforeEach } = require("node:test");

const api = supertest(app);

// 15 second timeout
jest.setTimeout(15000);

describe("Working solutions", () => {
  it("m1-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-01",
    };
    const res = await api
      .post("/api/assignments/64524f3c9e9d273d01b2c801")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-02",
    };
    const res = await api
      .post("/api/assignments/64524f3c9e9d273d01b2c807")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-03",
    };

    const res = await api
      .post("/api/assignments/64524f3c9e9d273d01b2c80d")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%204/assignment4.html",
    };
    const res = await api
      .post("/api/assignments/64524f3c9e9d273d01b2c813")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%205/assignment5.html",
    };
    const res = await api
      .post("/api/assignments/64524f3c9e9d273d01b2c819")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%206/assignment6.html",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c81f")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%207/assignment7.html",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c825")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%208/assignment8.html",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c82b")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%209/assignment9.html",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c831")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-01",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c837")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-02",
    };
    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c83d")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-03",
    };

    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c843")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-04",
    };

    const res = await api
      .post("/api/assignments/64524f3d9e9d273d01b2c849")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-05",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c84f")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-06",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c855")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-07",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c85b")
      .send(data);
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

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c861")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-01",
    };
    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c867")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-02",
    };
    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c86d")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-03",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c873")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-04",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c879")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-05",
    };

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c87f")
      .send(data);
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

    const res = await api
      .post("/api/assignments/64524f3e9e9d273d01b2c88b")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-08",
    };

    const res = await api
      .post("/api/assignments/64524f3f9e9d273d01b2c891")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-09",
    };

    const res = await api
      .post("/api/assignments/64524f3f9e9d273d01b2c897")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-10", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-10",
    };

    const res = await api
      .post("/api/assignments/64524f3f9e9d273d01b2c89d")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-11",
    };

    const res = await api
      .post("/api/assignments/64524f3f9e9d273d01b2c8a3")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("tvmaze", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/tvmaze",
    };

    const res = await api
      .post("/api/assignments/64524f3f9e9d273d01b2c8a9")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  afterAll(async () => {
    await database.disconnect();
  });
});

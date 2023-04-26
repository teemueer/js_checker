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
    const res = await api
      .post("/api/assignments/64490e4d50df48fd2ca183d4")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-02",
    };
    const res = await api
      .post("/api/assignments/64490e4d50df48fd2ca183da")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m1-03",
    };

    const res = await api
      .post("/api/assignments/64490e4d50df48fd2ca183e0")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%204/assignment4.html",
    };
    const res = await api
      .post("/api/assignments/64490e4d50df48fd2ca183e6")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%205/assignment5.html",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca183ec")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%206/assignment6.html",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca183f2")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%207/assignment7.html",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca183f8")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%208/assignment8.html",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca183fe")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m1-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~juhojj/JS-HTML-CHECKER/Modules/Module%201/Assignment%209/assignment9.html",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca18404")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-01",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca1840a")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-02",
    };
    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca18410")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-03",
    };

    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca18416")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-04",
    };

    const res = await api
      .post("/api/assignments/64490e4e50df48fd2ca1841c")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-05",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca18422")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-06", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-06",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca18428")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m2-07", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m2-07",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca1842e")
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
      .post("/api/assignments/64490e4f50df48fd2ca18434")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-01", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-01",
    };
    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca1843a")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-02", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-02",
    };
    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca18440")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-03", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-03",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca18446")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-04", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-04",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca1844c")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-05", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-05",
    };

    const res = await api
      .post("/api/assignments/64490e4f50df48fd2ca18452")
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
      .post("/api/assignments/64490e5050df48fd2ca1845e")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-08", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-08",
    };

    const res = await api
      .post("/api/assignments/64490e5050df48fd2ca18464")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-09", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-09",
    };

    const res = await api
      .post("/api/assignments/64490e5050df48fd2ca1846a")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-10", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-10",
    };

    const res = await api
      .post("/api/assignments/64490e5050df48fd2ca18470")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("m3-11", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/m3-11",
    };

    const res = await api
      .post("/api/assignments/64490e5050df48fd2ca18476")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  it("tvmaze", async () => {
    const data = {
      url: "https://users.metropolia.fi/~teemueer/html_js_checker/tvmaze",
    };

    const res = await api
      .post("/api/assignments/64490e5050df48fd2ca1847c")
      .send(data);
    expect(res.body.find((r) => r.result === "FAIL")).toBe(undefined);
  });

  afterAll(async () => {
    await database.disconnect();
  });
});

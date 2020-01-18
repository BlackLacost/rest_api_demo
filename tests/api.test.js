const req = require("supertest");

const app = require("../src/app");

describe("GET /", () => {
  it("status 200", async () => {
    const res = await req(app).get("/");
    expect(res.status).toBe(200);
  });

  it("json отображает название приложения", async () => {
    const res = await req(app).get("/");
    expect(res.body.appname).toBe("api");
  });

  it("json отображает версию api и status up", async () => {
    const res = await req(app).get("/");
    expect(res.body.version).toBe("v1");
  });

  it("json отображает status up", async () => {
    const res = await req(app).get("/");
    expect(res.body.status).toBe("up");
  });
});

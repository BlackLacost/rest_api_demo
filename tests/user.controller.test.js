const req = require("supertest");
const mongoose = require("mongoose");
const { Mockgoose } = require("mockgoose");
const { compare } = require("bcryptjs");

const app = require("../src/app");

const mockgoose = new Mockgoose(mongoose);

const baseUri = "/app/v1/users";

const mockMongoDBURL = "mongodb://localhost:27017/mockUserDB";

beforeAll(async () => {
  await mockgoose.prepareStorage();
  await mongoose.connect(mockMongoDBURL);
});

afterAll(async () => {
  await mockgoose.helper.reset();
});

describe("UserController", () => {
  describe(`POST ${baseUri}`, () => {
    it("Создаст новго пользователя", async () => {
      const res = await req(app)
        .post(baseUri)
        .send("login=user1")
        .send("password=user1");
      expect(res.status).toBe(201);
      expect(res.body.login).toBe("user1");
      expect(res.body._id).not.toBe("");
      expect(await compare("user1", res.body.password)).toBeTruthy();
    });

    it("Создаст еще одного пользователя", async () => {
      const res = await req(app)
        .post(baseUri)
        .send("login=user2")
        .send("password=user2");
      expect(res.body.login).toBe("user2");
    });
  });
});

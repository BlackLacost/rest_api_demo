const req = require("supertest");
const { compare } = require("bcryptjs");
const faker = require("faker");

const app = require("../src/app");
const { MongoDBUtil } = require("../src/modules/mongodb/mongodb.module");

const baseUri = "/api/v1/users";

// function getNewUser() {
//   return {
//     login: faker.internet.userName(),
//     password: faker.internet.password()
//   };
// }

// user1 = getNewUser(); //?
// user2 = getNewUser(); //?

const users = [
  { login: "user1", password: "user1" },
  { login: "user2", password: "user2" },
  { login: "user3", password: "user3" },
  { login: "user4", password: "user4" }
];

beforeAll(async () => {
  const res = await MongoDBUtil.connect({ mock: true });
  expect(res).toBe("MongoDB connected");
});

afterAll(async () => {
  // await MongoDBUtil.resetMockgoose();
});

describe("UserController", () => {
  describe(`POST ${baseUri}`, () => {
    it("Создаст 2 пользователей", () => {
      users.slice(0, 2).forEach(async user => {
        const res = await req(app)
          .post(baseUri)
          .send(user)
          .set("Accept", "application/json");
        expect(res.status).toBe(201);
        expect(res.body.login).toBe(user.login);
        expect(res.body._id).not.toBe("");
        expect(await compare(user.password, res.body.password)).toBeTruthy();
      });
    });

    it("Создаст еще одного пользователя", async () => {
      const user3 = users[2];
      const res = await req(app)
        .post(baseUri)
        .send(user3)
        .set("Accept", "application/json");
      expect(res.body.login).toBe(user3.login);
    });

    it("Нельзя создать пользователя с таким же логином", async () => {
      const user4 = users[2];
      await req(app)
        .post(baseUri)
        .send(user4)
        .set("Accept", "application/json");
      const res = await req(app)
        .post(baseUri)
        .send(user4)
        .set("Accept", "application/json");
      expect(res.status).toBe(409);
      expect(res.body.message).toBe(
        `Пользователь с логином: ${user4.login} уже существует`
      );
    });
  });

  describe(`GET ${baseUri}`, () => {
    it("get all users", async () => {
      const res = await req(app).get(baseUri);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.users)).toBeTruthy();
      expect(res.body.users.length).not.toBe(0);
    });
  });

  describe(`GET ${baseUri}/:id`, () => {
    it("Получить пользователя по id", async () => {
      let res = await req(app).get(baseUri);
      const users = res.body.users;
      const user1 = users[0];
      res = await req(app).get(`${baseUri}/${user1._id}`);
      expect(res.status).toBe(200);
      expect(res.body.user.login).toBe(user1.login);
    });

    it("Invalid id status 404", async () => {
      const invalidId = "5e237bcadb718830a4842028";
      res = await req(app).get(`${baseUri}/${invalidId}`);
      expect(res.status).toBe(404);
      expect(res.body.message).toBe(
        `Пользователь по данному id: ${invalidId} не существует`
      );
    });
  });

  describe(`PUT ${baseUri}/:id`, () => {
    it("Редактирование текущего пользователя", async () => {
      const newLogin = "newUserLogin";
      let res = await req(app).get(baseUri);
      const users = res.body.users;
      const user1 = users[0]; //?
      res = await req(app)
        .put(`${baseUri}/${user1._id}`)
        .send({
          login: newLogin
        })
        .set("Accept", "application/json");
      expect(res.status).toBe(200);
      expect(res.body.login).toBe(newLogin);
    });
  });

  describe(`DELETE ${baseUri}/:id`, () => {
    it("Удалить текущего пользователя", async () => {
      let res = await req(app).get(baseUri);
      const users = res.body.users;
      const user1 = users[0]; //?
      res = await req(app).delete(`${baseUri}/${user1._id}`);
      expect(res.status).toBe(200);
      expect(res.body.login).toBe(user1.login);
    });
  });
});

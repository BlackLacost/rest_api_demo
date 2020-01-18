const faker = require("faker");

const newUser1 = {
  login: faker.internet.userName,
  password: faker.internet.password
};

const newUser2 = {
  login: "user2",
  password: "user2"
};

module.exports = {
  newUser1,
  newUser2
};

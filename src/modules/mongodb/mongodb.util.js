const mongoose = require("mongoose");
const { Mockgoose } = require("mockgoose");

const config = require("../../config");

const mockgoose = new Mockgoose(mongoose);

function connect(mock = false) {
  return new Promise(async (resolve, reject) => {
    let dbUri = config.DB_URI;
    try {
      if (mock) {
        await mockgoose.prepareStorage();
        dbUri = config.TEST_DB_URI;
      }
      mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      resolve("MongoDB connected");
    } catch (err) {
      reject(err);
    }
  });
}

function resetMockgoose() {
  return new Promise(async (resolve, reject) => {
    try {
      await mockgoose.helper.reset();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  connect,
  resetMockgoose
};

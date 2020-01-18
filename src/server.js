const app = require("./app");
const config = require("./config");
const { MongoDBUtil } = require("./modules/mongodb/mongodb.module");

const port = config.PORT;

app.listen(port, async () => {
  console.log(await MongoDBUtil.connect());
  console.log(`Server started on ${port} port`);
});

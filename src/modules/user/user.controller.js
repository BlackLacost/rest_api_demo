const { Router } = require("express");

const User = require("./user.model");

const router = Router();

router.post("/", async (req, res) => {
  const { login, password } = req.body; //?
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

module.exports = router;

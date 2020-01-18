const { Router } = require("express");

const User = require("./user.model");

const router = Router();

router.post("/", async (req, res) => {
  const { login } = req.body;
  const user = await User.findOne({ login });
  if (user) {
    res
      .status(409)
      .json({ message: `Пользователь с логином: ${login} уже существует` });
  } else {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ user });
    } else {
      res
        .status(404)
        .json({ message: `Пользователь по данному id: ${id} не существует` });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    user.save();
    res.status(200).json(user);
  } catch (err) {}
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

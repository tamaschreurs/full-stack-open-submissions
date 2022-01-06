const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const blogs = await User.find({});
  response.json(blogs);
});

userRouter.post("/", async (request, response) => {
  const body = request.body;
  const password = body.password;

  if (
    typeof password !== "string" ||
    password === undefined ||
    password.length < 3
  ) {
    response
      .status(400)
      .send("Error: password not defined or less than 3 characters");
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = userRouter;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("tests when one user is added to the DB", () => {
  test("adding of user with missing password leads to 400 and error message", async () => {
    const usersAtStart = await helper.usersInDB();
    const invalidUser = { name: "Yourky", username: "pxtqe" };

    await api.post("/api/users").send(invalidUser).expect(400);

    const usersAtEnd = await helper.usersInDB();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("adding of user with invalid username leads to 400 and error message", async () => {
    const usersAtStart = await helper.usersInDB();
    const invalidUser = { name: "Yourky", username: "px", password: "correct" };

    await api.post("/api/users").send(invalidUser).expect(400);

    const usersAtEnd = await helper.usersInDB();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

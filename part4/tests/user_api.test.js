const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();

  const blogObjects = helper.initialBlogs.map((blog) => {
    return {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      userId: user._id,
    };
  });

  for (const blog of blogObjects) {
    await api.post("/api/blogs").send(blog);
  }
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

describe("testing the interaction between user and blogs", () => {
  test("display associated user object when retrieving all blogs", async () => {
    const response = await api.get("/api/blogs");
    const userInfo = response.body.map((blog) => {
      return blog.user.username;
    });

    expect(userInfo).toContain("root");
  });

  test("display associated blogs when retrieving user", async () => {
    const response = await api.get("/api/users");
    const returnedUser = response.body[0];
    const blogTitles = returnedUser.blogs.map((blog) => blog.title);

    expect(blogTitles).toContain("Go To Statement Considered Harmful");
    expect(blogTitles).toContain("TDD harms architecture");
  });
});

afterAll(() => {
  mongoose.connection.close();
});

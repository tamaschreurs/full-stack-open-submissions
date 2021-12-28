const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

const api = supertest(app);

test("all blogs are returned in json format", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("identifier of blogs is defined by the id property", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("POST request leads to new blog in DB", async () => {
  const newBlog = {
    title: "The wonderful world of programming",
    author: "Pesky Programmer",
    url: "https://example.com/peskyprogrammer",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog);

  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain("The wonderful world of programming");
});

afterAll(() => {
  mongoose.connection.close();
});

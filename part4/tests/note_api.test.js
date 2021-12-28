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

describe("testing the note api", () => {
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
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain("The wonderful world of programming");
  });

  test("likes are 0 if likes is missing from the request", async () => {
    const newBlog = {
      title: "The wonderful world of programming",
      author: "Pesky Programmer",
      url: "https://example.com/peskyprogrammer",
    };

    await api.post("/api/blogs").send(newBlog);

    const response = await api.get("/api/blogs");
    const urlLikes = response.body.map((item) => {
      return { url: item.url, likes: item.likes };
    });

    expect(urlLikes).toContainEqual({ url: newBlog.url, likes: 0 });
  });

  test("400 response for requests without title and url properties", async () => {
    const newBlog = {
      author: "Pesky Programmer",
      likes: 6,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

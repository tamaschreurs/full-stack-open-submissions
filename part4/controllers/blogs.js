const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  let newBlog = request.body;

  if (newBlog.url === undefined || newBlog.title === undefined) {
    response
      .status(400)
      .send("Error: cannot create blog without title or URL.");
  }

  if (newBlog.likes === undefined) {
    newBlog.likes = 0;
  }

  const blog = new Blog(newBlog);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;

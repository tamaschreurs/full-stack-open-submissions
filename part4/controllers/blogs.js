const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  await Blog.findByIdAndRemove(id);

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const likeUpdated = { likes: request.body.likes };

  const updatedNote = await Blog.findByIdAndUpdate(id, likeUpdated, {
    new: true,
    runValidators: true,
  });
  response.json(updatedNote);
});

blogRouter.post("/", async (request, response) => {
  let newBlog = request.body;

  if (newBlog.url === undefined || newBlog.title === undefined) {
    response
      .status(400)
      .send("Error: cannot create blog without title or URL.");
    return;
  }

  if (newBlog.likes === undefined) {
    newBlog.likes = 0;
  }

  const blog = new Blog(newBlog);

  const result = await blog.save();

  response.status(201).json(result);
});

module.exports = blogRouter;

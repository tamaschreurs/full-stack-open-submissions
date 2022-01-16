const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blogToDelete = await Blog.findById(id);

  if (blogToDelete.user.toString() !== decodedToken.id) {
    return response
      .status(401)
      .json({ error: "user not authorised to delete blog" });
  }

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
  const newBlog = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (newBlog.likes === undefined) {
    newBlog.likes = 0;
  }

  const blog = new Blog({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes,
    user: user._id,
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

module.exports = blogRouter;

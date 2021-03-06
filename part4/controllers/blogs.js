const blogRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;

  const user = request.user;

  const blogToDelete = await Blog.findById(id);

  if (
    blogToDelete &&
    blogToDelete.user &&
    blogToDelete.user.toString() !== user.id.toString()
  ) {
    return response
      .status(401)
      .json({ error: "user not authorised to delete blog" });
  }

  await Blog.findByIdAndRemove(id);

  response.status(204).end();
});

blogRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  const originalBlog = await Blog.findById(id);
  let comments;
  if (originalBlog.comments) {
    comments = [...originalBlog.comments, comment];
  } else {
    comments = [comment];
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { comments },
    { new: true, runValidators: true }
  );

  response.json(updatedBlog);
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const likeUpdated = { likes: request.body.likes };

  const updatedBlog = await Blog.findByIdAndUpdate(id, likeUpdated, {
    new: true,
    runValidators: true,
  });
  response.json(updatedBlog);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const newBlog = request.body;

  const user = request.user;

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

  const formattedBlog = await Blog.findById(result._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(formattedBlog);
});

module.exports = blogRouter;

const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "HCH",
    author: "Peter Paas",
    url: "http://example.com",
    likes: 12,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog(initialBlogs[0]);
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDB = async () => {
  let blogs = await Blog.find({});
  blogs = blogs.map((blog) => blog.toJSON());
  return blogs;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
};

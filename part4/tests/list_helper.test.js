const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithMoreBlogs = [
  ...listWithOneBlog,
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "61be6df8e2d915d42c049616",
    title: "HCH",
    author: "Peter Paas",
    url: "http://example.com",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 3,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog it equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(listWithMoreBlogs);
    expect(result).toBe(30);
  });
});

describe("favourite blog", () => {
  test("when no blog is in the list, is an empty object", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual({});
  });

  test("when list has only one blog, formatted version of that blog is returned", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expected = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test("of multiple blogs is blog with most likes", () => {
    const result = listHelper.favoriteBlog(listWithMoreBlogs);
    const expected = {
      title: "HCH",
      author: "Peter Paas",
      likes: 12,
    };
    expect(result).toEqual(expected);
  });
});

describe("most common author", () => {
  test("in an empty list is an empty object", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({});
  });

  test("in a list with one author is that author", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    expect(result).toEqual(expected);
  });

  test("in a list of authors is the author with most written posts", () => {
    const result = listHelper.mostBlogs(listWithMoreBlogs);
    const expected = {
      author: "Robert C. Martin",
      blogs: 2,
    };
    expect(result).toEqual(expected);
  });
});

describe("author with most likes", () => {
  test("in an empty list is an empty object", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({});
  });

  test("in a list with one author is that author", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test("in a list of authors is the author with most total likes", () => {
    const result = listHelper.mostLikes(listWithMoreBlogs);
    const expected = {
      author: "Robert C. Martin",
      likes: 13,
    };
    expect(result).toEqual(expected);
  });
});

const { result } = require("lodash");
const __ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogList) => {
  const likes = blogList.reduce((sum, blog) => sum + blog.likes, 0);
  return likes;
};

const favoriteBlog = (blogList) => {
  const favorite = blogList.reduce((fav, blog) => {
    if (fav.likes) {
      return fav.likes < blog.likes ? blog : fav;
    }
    return blog;
  }, {});

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogList) => {
  let result = {};
  if (blogList.length > 0) {
    let mostPopular = __.countBy(blogList, "author");
    mostPopular = __.toPairs(mostPopular);
    mostPopular = __.maxBy(mostPopular, __.last());
    result = {
      author: mostPopular[0],
      blogs: mostPopular[1],
    };
  }

  return result;
};

const mostLikes = (blogList) => {
  let result = { likes: -1 };
  if (blogList.length > 0) {
    let mostPopular = __.groupBy(blogList, "author");
    __.forEach(mostPopular, (author) => {
      let sum = __.sumBy(author, "likes");
      if (sum > result.likes) {
        result = {
          author: author[0].author,
          likes: sum,
        };
      }
    });
    // mostPopular = __.toPairs(mostPopular);
    // mostPopular = __.maxBy(mostPopular, __.last());
  } else {
    result = {};
  }

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

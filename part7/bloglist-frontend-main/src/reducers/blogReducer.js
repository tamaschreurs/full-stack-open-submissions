/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from "../services/blogs";

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  let sortedBlogs;
  switch (action.type) {
    case "INIT_BLOGS":
      sortedBlogs = sortBlogs(action.data);
      return sortedBlogs;
    case "ADD_LIKE":
      const blog = state.find((blog) => blog.id === action.data);
      const changedBlog = { ...blog, likes: blog.likes + 1 };
      const newblogs = state.map((blog) =>
        blog.id !== action.data ? blog : changedBlog
      );
      return sortBlogs(newblogs);
    case "ADD_BLOG":
      return state.concat(action.data);
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    default:
      return state;
  }
};

const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    const likesA = a.likes ? parseInt(a.likes) : -1;
    const likesB = b.likes ? parseInt(b.likes) : -1;
    return likesB - likesA;
  });
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const newLike = (blog) => {
  return async (dispatch) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(changedBlog);
    dispatch({
      type: "ADD_LIKE",
      data: changedBlog.id,
    });
  };
};

export const newBlog = (info, token) => {
  return async (dispatch) => {
    const blog = await blogService.postNew(info, token);
    dispatch({
      type: "ADD_BLOG",
      data: blog,
    });
  };
};

export const deleteBlog = (blogId, token) => {
  return async (dispatch) => {
    await blogService.remove(blogId, token);
    dispatch({
      type: "REMOVE_BLOG",
      data: blogId,
    });
  };
};

export default reducer;

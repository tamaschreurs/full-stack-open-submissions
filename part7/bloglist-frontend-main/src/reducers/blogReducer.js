/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import blogService from "../services/blogs";
import { newMessage } from "./messageReducer";

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
    case "UPDATE_COMMENTS":
      const commentedBlog = state.find((blog) => blog.id === action.data.id);
      const newCommentedBlog = {
        ...commentedBlog,
        comments: action.data.comments,
      };
      const allUpdatedblogs = state.map((blog) =>
        blog.id !== action.data.id ? blog : newCommentedBlog
      );
      return allUpdatedblogs;
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
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1 };
      await blogService.update(changedBlog);
      dispatch({
        type: "ADD_LIKE",
        data: changedBlog.id,
      });
      dispatch(
        newMessage(`Like succesfully added to ${blog.title}`, "success")
      );
    } catch (error) {
      dispatch(newMessage("Like could not be added", "error"));
    }
  };
};

export const newBlog = (info, token) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.postNew(info, token);
      dispatch({
        type: "ADD_BLOG",
        data: blog,
      });
      dispatch(
        newMessage(
          `New blog: ${info.title} by ${info.author} succesfully added`,
          "success"
        )
      );
    } catch (error) {
      dispatch(newMessage("Blog could not be added", "error"));
    }
  };
};

export const deleteBlog = (blogId, token) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogId, token);
      dispatch({
        type: "REMOVE_BLOG",
        data: blogId,
      });
      dispatch(newMessage("Blog succesfully removed", "success"));
    } catch (error) {
      dispatch(newMessage("Blog could not be removed", "error"));
    }
  };
};

export const newComment = (blogId, content) => {
  return async (dispatch) => {
    try {
      const response = await blogService.comment(blogId, content);
      dispatch({
        type: "UPDATE_COMMENTS",
        data: {
          id: blogId,
          comments: response.comments,
        },
      });
      dispatch(newMessage("Comment succesfully added", "success"));
    } catch (error) {
      console.log(error);
      dispatch(newMessage("Comment could not be added", "error"));
    }
  };
};

export default reducer;

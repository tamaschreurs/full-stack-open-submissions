import React from "react";
import { useDispatch } from "react-redux";
import { newComment } from "../reducers/blogReducer";
import CommentForm from "./CommentForm";

const BlogDetails = ({ blog, handleLike, handleRemove }) => {
  const dispatch = useDispatch();

  const addComment = (event) => {
    event.preventDefault();

    const comment = event.target.comment.value;
    dispatch(newComment(blog.id, comment));
    event.target.comment.value = "";
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <a href={blog.url} rel="noreferrer" target="_blank">
        {blog.url}
      </a>
      <br />
      <span className="like-info">{blog.likes} likes</span>
      <button onClick={handleLike} className="like">
        like
      </button>
      <br />
      {blog.user ? `added by ${blog.user.name}` : ""}
      <br />
      <button onClick={handleRemove}>remove</button>
      <h3>comments</h3>
      <CommentForm handleComment={addComment} />
      {blog.comments.length !== 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet</p>
      )}
    </div>
  );
};

export default BlogDetails;

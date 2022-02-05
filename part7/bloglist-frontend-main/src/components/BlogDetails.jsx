import React from "react";

const BlogDetails = ({ blog, handleLike, handleRemove }) => {
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

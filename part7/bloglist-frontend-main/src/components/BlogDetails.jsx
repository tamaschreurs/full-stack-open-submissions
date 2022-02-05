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
    </div>
  );
};

export default BlogDetails;

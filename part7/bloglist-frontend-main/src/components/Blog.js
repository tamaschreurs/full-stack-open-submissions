import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [expandedView, setExpandedView] = useState(false);
  const borderStyle = { border: "solid", padding: "5px" };

  let content;
  if (!expandedView) {
    content = (
      <p style={borderStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>{" "}
        {/* <button className="view-button" onClick={() => setExpandedView(true)}>
          view
        </button> */}
      </p>
    );
  } else {
    content = (
      <p style={borderStyle} className="blog">
        {blog.title} {blog.author}{" "}
        <button onClick={() => setExpandedView(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        <span className="like-info">{blog.likes} </span>
        <button onClick={handleLike} className="like">
          like
        </button>
        <br />
        {blog.user ? blog.user.name : ""}
        <br />
        <button onClick={handleRemove}>remove</button>
      </p>
    );
  }

  return <div>{content}</div>;
};

export default Blog;

import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [expandedView, setExpandedView] = useState(false);
  const borderStyle = { border: "solid", padding: "5px" };

  console.log(blog);

  let content;
  if (!expandedView) {
    content = (
      <p style={borderStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setExpandedView(true)}>view</button>
      </p>
    );
  } else {
    content = (
      <p style={borderStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setExpandedView(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button>like</button>
        <br />
        {blog.user ? blog.user.name : ""}
      </p>
    );
  }

  return <div>{content}</div>;
};

export default Blog;

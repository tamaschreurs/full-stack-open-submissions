import React, { useState } from "react";
import propTypes from "prop-types";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = (event) => {
    event.preventDefault();
    addBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <TextField
            id="title"
            type="text"
            value={title}
            name="Title"
            label="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id="author"
            type="text"
            value={author}
            name="Author"
            label="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id="url"
            type="text"
            value={url}
            name="Url"
            label="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit" id="submit-blog">
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: propTypes.func.isRequired,
};

export default BlogForm;

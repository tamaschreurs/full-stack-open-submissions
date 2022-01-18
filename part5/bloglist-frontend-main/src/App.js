import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  const resetUser = () => {
    window.localStorage.removeItem("userInfo");
    setUser(null);
    createMessage("Succesfully logged out", "success");
  };

  const createMessage = (content, type) => {
    setMessage({ content, type });
    setTimeout(() => setMessage({}), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("userInfo", JSON.stringify(user));

      setUsername("");
      setPassword("");
      createMessage(`${user.name} logged in succesfully`, "success");
    } catch (exception) {
      createMessage("Wrong credentials", "error");
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.postNew(
        {
          title,
          author,
          url,
        },
        user.token
      );

      setTitle("");
      setAuthor("");
      setUrl("");

      const blogs = await blogService.getAll();
      setBlogs(blogs);

      createMessage(
        `New blog: ${blog.title} by ${blog.author} succesfully added`,
        "success"
      );
    } catch (exception) {
      createMessage("Blog could not be added", "error");
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message message={message.content} type={message.type} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message message={message.content} type={message.type} />
      <p>
        {user.name} is logged in.
        <button onClick={resetUser}>log out</button>
      </p>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleBlogSubmit={handleBlogSubmit}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  const blogFormRef = useRef();

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

  const addLike = async (blog) => {
    try {
      let updatedBlog = { ...blog };
      updatedBlog.likes = updatedBlog.likes + 1;

      await blogService.update(updatedBlog);

      const blogs = await blogService.getAll();
      setBlogs(blogs);

      createMessage(
        `Like succesfully added to ${updatedBlog.title}`,
        "success"
      );
    } catch (exception) {
      createMessage("Like could not be added", "error");
    }
  };

  const addBlog = async (blogInfo) => {
    try {
      const blog = await blogService.postNew(blogInfo, user.token);

      blogFormRef.current.toggleVisibility();

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
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={() => addLike(blog)} />
      ))}
    </div>
  );
};

export default App;

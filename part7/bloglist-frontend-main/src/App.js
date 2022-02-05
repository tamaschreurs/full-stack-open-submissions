import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  initBlogs,
  newLike,
  newBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { newMessage } from "./reducers/messageReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());

    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  const { blogs, message } = useSelector((state) => state);

  const resetUser = () => {
    window.localStorage.removeItem("userInfo");
    setUser(null);
    dispatch(newMessage("Succesfully logged out", "success"));
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
      dispatch(newMessage(`${user.name} logged in succesfully`, "success"));
    } catch (exception) {
      dispatch(newMessage("Wrong credentials", "error"));
    }
  };

  const addLike = (blog) => {
    dispatch(newLike(blog));
  };

  const addBlog = (blogInfo) => {
    dispatch(newBlog(blogInfo, user.token));
    blogFormRef.current.toggleVisibility();
  };

  const removeBlog = async (blogId, blogTitle) => {
    if (window.confirm(`Do you want to remove ${blogTitle}?`)) {
      dispatch(deleteBlog(blogId, user.token));
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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => addLike(blog)}
          handleRemove={() => removeBlog(blog.id, blog.title)}
        />
      ))}
    </div>
  );
};

export default App;

import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const postNew = (blogInfo, token) => {
  const request = axios.post(baseUrl, blogInfo, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return request.then((response) => response.data);
};

const update = (blog) => {
  if (!blog.user) {
    throw new Error("Cannot update blog, no user specified!");
  }
  const blogInfo = {
    user: blog.user.id,
    likes: blog.likes,
    title: blog.title,
    url: blog.url,
    author: blog.author,
  };

  const request = axios.put(`${baseUrl}/${blog.id}`, blogInfo);
  return request.then((response) => response.data);
};

const remove = (blogId, token) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return request.then((response) => response.data);
};

export default { getAll, postNew, update, remove };

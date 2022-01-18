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

export default { getAll, postNew };

import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-task-manager-o725.onrender.com/api",
  withCredentials: true
});

export default API;
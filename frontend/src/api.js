import axios from "axios";

const API = axios.create({
  baseURL: "https://cleancityai-1.onrender.com",
});

export default API;
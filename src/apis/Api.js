import axios from "axios";

let Api = axios.create({
  baseURL: process.env.VUE_APP_API_ROOT,
  mode: "no-cors",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  },
  credentials: "same-origin"
});

Api.defaults.withCredentials = true;

export default Api;

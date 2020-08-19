import axios from "axios";

let Api = axios.create({
    baseURL: "https://video-manolo.herokuapp.com/api"
});

Api.defaults.withCredentials = true;

export default Api;

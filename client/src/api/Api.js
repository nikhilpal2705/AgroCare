import axios from "axios";
// import config from "../config/developer.config";

export default axios.create({
    baseURL: 'https://springreact-4fk2.onrender.com:8080/',
});
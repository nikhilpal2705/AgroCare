import axios from "axios";
// import config from "../config/developer.config";

export default axios.create({
    baseURL: `http://localhost:${process.env.REACT_APP_API_PORT}/`,
});
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";


let requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export default requests;

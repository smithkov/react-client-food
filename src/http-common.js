import axios from "axios";
import { SERVER_URL, getUserToken,asyncLocalStorage } from "./utility/global";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "application/json",
    //Authorization: `Bearer ${sessionStorage.getItem("tk")}`,
  },
});

import axios from "axios";
import {SERVER_URL} from './utility/global'
axios.defaults.withCredentials = true
export default axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-type": "application/json"
  },
  
});

import axios from "axios";
import headers from "./headers.json";

const fetchPage = async (url) => (
  axios.get(url, { headers }).then(res => res.data).catch(error => { throw new Error(error.message) })
)

export default fetchPage;
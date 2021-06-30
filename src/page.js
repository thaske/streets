import axios from "axios";
import headers from "./headers.json";

const page = async (url) => (
  await axios.get(url, { headers }).then(res => res.data).catch(error => { throw new Error(error.message) })
)

export default page;
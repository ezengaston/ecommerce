import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export async function getItems() {
  const res = await apiInstance.get("/items");
  return res.data;
}

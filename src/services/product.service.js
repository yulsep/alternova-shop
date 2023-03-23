import { API } from "../api";
import { BASE_URL } from "../utils";

export async function fetchAllProducts() {
  try {
    const products = await API.get(`${BASE_URL}`);
    console.log(products);
    return products;
  } catch (error) {
    throw new Error(`Problems to get data...`);
  }
}

/* In case we need to consume any backend

import { API } from "../api";
import { BASE_URL } from "../utils";

export async function fetchAllProducts() {
  try {
    const products = await API.get(`${BASE_URL}`);
    return products;
  } catch (error) {
    throw new Error(`Problems to get data...`);
  }
}
 */

import productsMock from "../mocks/productsMock.json";

export async function fetchAllProducts() {
  try {
    const products = await import("../mocks/productsMock.json");
    return products.default;
  } catch (error) {
    console.error(`Problems to get data: ${error.message}`);
    return productsMock;
  }
}

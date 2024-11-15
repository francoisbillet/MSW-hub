import { http, HttpResponse } from "msw";
import { ProductResponse } from "../products/products.api";

export const handlers = [
  // Intercept "GET https://dummyjson.com/products" requests..
  http.get("https://dummyjson.com/products", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(productsResponse);
  }),
];

const productsResponse: ProductResponse = {
  products: [
    {
      id: "1",
      title: "Product 1",
      price: 100,
    },
    {
      id: "2",
      title: "Product 2",
      price: 200,
    },
  ],
  limit: 10,
  skip: 0,
  total: 2,
};

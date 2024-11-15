import { http, HttpResponse } from "msw";
import {
  ProductResponse,
  UpdateProductRequestBody,
} from "../products/products.api";

export const handlers = [
  // Intercept "GET https://dummyjson.com/products" requests..
  http.get("https://dummyjson.com/products", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(productsResponse);
  }),
  http.put("https://dummyjson.com/products/1", async ({ request }) => {
    const body = (await request.json()) as UpdateProductRequestBody;

    return HttpResponse.json({
      ...productsResponse,
      products: productsResponse.products.map((product) =>
        product.id === "1" ? { ...product, title: body.title } : product
      ),
    });
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

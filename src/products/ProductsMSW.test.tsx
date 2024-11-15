import { render, screen } from "@testing-library/react";
import { Products } from "./Products";
import { ProductResponse } from "./products.api";
import { delay, http, HttpResponse } from "msw";
import { server } from "../mocks/node";

describe("Products", () => {
  it("should render 2 products", async () => {
    // Given
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

    server.use(
      http.get("https://dummyjson.com/products", () => {
        return HttpResponse.json(productsResponse);
      })
    );

    // When
    render(<Products />);

    // Then
    expect(
      await screen.findByRole("heading", { name: "Products" })
    ).toBeInTheDocument();
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("should display loading state", async () => {
    // Given
    server.use(
      http.get("https://dummyjson.com/products", async () => {
        await delay("infinite");
        return new HttpResponse();
      })
    );

    // When
    render(<Products />);

    // Then
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error state", async () => {
    // Given
    server.use(
      http.get("https://dummyjson.com/products", () => {
        return HttpResponse.json("An error occurred", { status: 404 });
      })
    );

    // When
    render(<Products />);

    // Then
    expect(await screen.findByText("Error")).toBeInTheDocument;
  });
});

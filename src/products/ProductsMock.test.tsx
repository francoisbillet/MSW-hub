import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Products } from "./Products";
import { vi } from "vitest";
import { getProducts, Product, ProductResponse } from "./products.api";

vi.mock("./products.api", () => ({
  getProducts: vi.fn(),
}));

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

    vi.mocked(getProducts).mockResolvedValue(productsResponse);

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
});

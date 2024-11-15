import { render, screen } from "@testing-library/react";
import { Products } from "./Products";

describe("Products", () => {
  it("should render 2 products", async () => {
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

import { render, screen } from "@testing-library/react";
import { Products } from "./Products";
import { server } from "../mocks/node";
import { handlers } from "../mocks/handlers";

describe("Products", () => {
  beforeEach(() => {
    server.resetHandlers(...handlers);
  });

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

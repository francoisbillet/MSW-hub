import { render, screen } from "@testing-library/react";
import { Products } from "./Products";
import { ProductResponse, UpdateProductRequestBody } from "./products.api";
import { delay, http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import userEvent from "@testing-library/user-event";

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

  it("should update product 1 title", async () => {
    const user = userEvent.setup();

    // Given
    const productResponse: ProductResponse = {
      products: [
        {
          id: "1",
          title: "Product 1",
          price: 100,
        },
      ],
      limit: 10,
      skip: 0,
      total: 1,
    };
    let productWasUpdated = false;

    server.use(
      http.get("https://dummyjson.com/products", () => {
        return HttpResponse.json(productResponse);
      }),

      http.put<
        { productId: string },
        UpdateProductRequestBody,
        ProductResponse
      >(
        "https://dummyjson.com/products/:productId",
        async ({ request, params }) => {
          const { productId } = params;
          const body = await request.json();

          if (productId === "1" && body.title === "Updated Product 1 title") {
            productWasUpdated = true;
          }

          return HttpResponse.json({
            ...productResponse,
            products: productResponse.products.map((product) =>
              product.id === "1" ? { ...product, title: body.title } : product
            ),
          });
        }
      )
    );

    render(<Products />);

    // When
    await user.type(
      await screen.findByLabelText("New Title"),
      "Updated Product 1 title"
    );
    await user.click(screen.getByRole("button", { name: "Update product 1" }));

    // Then
    expect(productWasUpdated).toBe(true);
  });
});

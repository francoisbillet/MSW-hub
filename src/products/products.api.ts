export type ProductResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export type Product = {
  id: string;
  title: string;
  price: number;
};

export async function getProducts() {
  const response = await fetch("https://dummyjson.com/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw Error("there was an error");
  }
  return response.json() as Promise<ProductResponse>;
}

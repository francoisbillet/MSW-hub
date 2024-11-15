import { useEffect, useState } from "react";
import { getProducts, Product } from "./products.api";

export const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((productsResponse) => {
        setProducts(productsResponse.products);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

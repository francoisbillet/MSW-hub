import { useEffect, useState } from "react";
import { getProducts, Product } from "../products.api";

export const useGetProducts = (updatedProduct: Product | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((productsResponse) => {
        setProducts(
          productsResponse.products.map((product) =>
            product.id === updatedProduct?.id ? updatedProduct : product
          )
        );
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [updatedProduct]);

  return { products, loading, error };
};

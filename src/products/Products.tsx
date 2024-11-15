import { useRef, useState } from "react";
import { useGetProducts } from "./hooks/useGetProducts";
import { Product, updateProduct } from "./products.api";

export const Products = () => {
  const [updatedProduct, setUpdatedProduct] = useState<Product | null>(null);
  const { products, loading, error } = useGetProducts(updatedProduct);
  const title = useRef("");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const handleUpdateProduct = async (
    e: React.SyntheticEvent,
    productId: string
  ) => {
    e.preventDefault();
    const updatedProduct = await updateProduct(productId, {
      title: title.current,
    });
    setUpdatedProduct(updatedProduct);
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-2">
      <h1 className="text-center">Products</h1>
      <div className="flex flex-col gap-3 pl-10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-3">
            <h2>{product.title}</h2>
            <p>{product.price}</p>

            <form className="flex gap-2 items-center border border-yellow-700 p-1 w-fit">
              <label htmlFor="title">New Title</label>
              <input
                id="title"
                type="text"
                className="border border-gray-400"
                onChange={(e) => (title.current = e.target.value)}
              />
              <button
                type="submit"
                onClick={(e) => handleUpdateProduct(e, product.id)}
              >{`Update product ${product.id}`}</button>
            </form>
            <div className="border w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

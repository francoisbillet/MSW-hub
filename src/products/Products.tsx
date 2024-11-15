import { useGetProducts } from "./useGetProducts";

export const Products = () => {
  const { products, loading, error } = useGetProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-2">
      <h1 className="text-center">Products</h1>
      <div className="flex flex-col gap-3 pl-4">
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

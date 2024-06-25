export const getCollections = async () => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    { method: "GET" }
  );
  const data = await collection.json();
  return data;
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
  });
  const data = await products.json();
  return data;
};

export const getProductDetails = async (productId: string) => {
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  return await product.json();
};

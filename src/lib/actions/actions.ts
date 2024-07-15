export const getCollections = async () => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    { method: "GET" }
  );
  const data = await collection.json();
  return data;
};

export const getCollectionDetails = async (collectionId: string) => {
  const collection = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    { method: "GET" }
  );
  const data = await product.json();
  return data;
};

export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`,
    { method: "GET" }
  );
  const data = await searchedProducts.json();
  return data;
};

export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,
    { method: "GET" }
  );
  const data = await orders.json();
  return data;
};

export const getRelatedProducts = async (productId: string) => {
  const relatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
  );
  const data = await relatedProducts.json();
  return data;
};

export const getHandmadeOrder = async () => {
  const handmade = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/handmade`, {
    method: "GET",
  });
  const data = await handmade.json();
  return data;
};

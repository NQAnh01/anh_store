type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colors: [string];
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  fullName: string;
  phone: string;
  address: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  shippingAddress: string;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  status: string;
  total: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  quantity: number;
  _id: string;
};

type HandmadeType = {
  _id: string;
  clerkId: string;
  title: string;
  description: string;
  image: string;
};

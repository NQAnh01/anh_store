"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeartFavorite from "./HeartFavorite";
import { formatCurrencyVND } from "./ToVnd";
import useCart from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  const cart = useCart();
  const handleAddToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click truyền lên Link
    cart.addItem({
      item: product,
      quantity: 1,
      color: product.colors[0],
    });
  };
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <p className="text-base-bold">{product.title}</p>
            <p className="text-small-medium text-gray-500">
              {product.category}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-body-bold">{formatCurrencyVND(product.price)}</p>
          {/* <HeartFavorite
            product={product}
            updateSignedInUser={updateSignedInUser}
          /> */}
          <button
            className="outline text-base-bold w-10 py-3 flex justify-center items-center rounded-lg hover:bg-black hover:text-white"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-7 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

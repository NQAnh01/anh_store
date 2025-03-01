"use client";
import React, { useEffect, useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
import { formatCurrencyVND } from "./ToVnd";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4 relative">
      <div className="flex justify-between items-center">
        <p className="text-heading3-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium text-grey-2">Loại:</p>
        <p className="text-base-bold">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold">
        {formatCurrencyVND(productInfo.price)}
      </p>

      <div className="flex flex-col gap-2 justify-between">
        <p className="text-base-medium text-grey-2 ">Mô tả:</p>
        {/* <p className="text-small-medium"> */}
        <div className="whitespace-pre-wrap text-small-medium overflow-auto max-w-full max-h-56 p-4 ">
          {productInfo.description}
        </div>
        {/* </p> */}
      </div>
      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Màu sắc:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}
      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2">Số lượng:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-body-bold">{quantity}</p>
          <PlusCircle
            className="hover:text-red-1 cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>
      <button
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white "
        onClick={() =>
          cart.addItem({ item: productInfo, quantity, color: selectedColor })
        }
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductInfo;

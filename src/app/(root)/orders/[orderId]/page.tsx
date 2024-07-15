import Image from "next/image";
import React from "react";
import { format } from "date-fns";

const OrdersDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();
  return (
    <div className="px-20 py-5 max-sm:px-3">
      <div className="my-10">
        <div className="flex mt-3 gap-2">
          <p className="text-heading3-bold">Đơn hàng: </p>
          <p className="text-heading3-bold">{orderDetails._id}</p>
        </div>
        <div className="flex mt-3 gap-2">
          <p className="text-heading4-bold">Ngày đặt hàng: </p>
          <p className="text-heading4-bold">
            {format(new Date(orderDetails.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="flex mt-3 gap-2">
          <p className="text-heading4-bold">Tổng: </p>
          <p className="text-heading4-bold">{orderDetails.total} (vnd)</p>
        </div>
      </div>

      <div>
        {orderDetails.products.map((productItem: OrderItemType) => (
          <div
            key={productItem._id}
            className="flex items-center w-full max-w-2xl space-x-4 mb-8 justify-between"
          >
            <div className=" h-20 my-5 gap-2">
              <p className="text-lg font-semibold flex items-center">
                {productItem.product.title}
              </p>
              <Image
                src={productItem.product.media[0]} // Sử dụng đường dẫn hình ảnh đầu tiên trong mảng media của product
                alt={productItem.product.title}
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <div>
              <p>Số lượng</p>
              <p className="text-sm text-gray-500">{productItem.quantity}</p>
            </div>

            <div>
              <p>Màu</p>
              <p className="text-base">{productItem.product.colors}</p>
            </div>

            <div>
              <p>Giá</p>
              <p className="text-base">{productItem.product.price}.000 đ</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersDetails;

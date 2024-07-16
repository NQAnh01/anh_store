import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { formatCurrencyVND } from "@/components/ToVnd";

const OrdersDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();
  console.log("Order Details: ", orderDetails);
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Sản phẩm
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hình ảnh
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số lượng
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Màu
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Giá
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orderDetails.products.map((productItem: OrderItemType) => (
            <tr key={productItem._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold">
                  {productItem.product.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Image
                  src={productItem.product.media[0]} // Sử dụng đường dẫn hình ảnh đầu tiên trong mảng media của product
                  alt={productItem.product.title}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {productItem.quantity}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base">{productItem.color}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-base">
                  {formatCurrencyVND(productItem.product.price)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersDetails;

import { format } from "date-fns";
import Link from "next/link";
import { formatCurrencyVND } from "./ToVnd";

const OrderTable: React.FC<any> = ({ orders }) => {
  console.log("Order:", orders);
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="overflow-x-auto">
          <div className="min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Mã Đơn Hàng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ngày Tạo
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sản Phẩm
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tổng cộng
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                </tr>
              </thead>
              {orders.map((order: any) => {
                return (
                  <tbody>
                    <tr key={order._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link
                          href={`/orders/${order._id}`}
                          className="text-gray-900 whitespace-no-wrap hover:text-blue-1"
                        >
                          {order._id}
                        </Link>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {format(new Date(order.createdAt), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="text-gray-900 whitespace-no-wrap">
                          {order.products.map(
                            (product: OrderItemType, index: number) => (
                              <li key={index}>{product.product.title}</li>
                            )
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatCurrencyVND(order.total)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {order.status}
                        {/* <span
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            order.status === "Completed"
                              ? "text-green-900"
                              : "text-red-900"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`absolute inset-0 ${
                              order.status === "Completed"
                                ? "bg-green-200"
                                : "bg-red-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">{order.status}</span>
                        </span> */}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

// Custom cell component to format the date
// const DateCell = ({ row }: any) => {
//   const formattedDate = format(new Date(row.original.createdAt), "dd/MM/yyyy");
//   return <span>{formattedDate}</span>;
// };

const ProductTypesCell = ({ row }: any) => {
  const productTypes = row.original.products
    .map((item: OrderItemType) => item.product.title)
    .join(", ");

  return <div>{productTypes}</div>;
};

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "_id",
    header: "Mã đơn hàng",
    cell: ({ row }) => (
      <div className="truncate">
        <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
          {row.original._id}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Ngày đặt",
    // cell: DateCell, // Use the custom DateCell component
  },
  {
    accessorKey: "products",
    header: "Sản phẩm",
    cell: ProductTypesCell, // Use the component to display product types
  },
  {
    accessorKey: "total",
    header: "Tổng cộng (vnd)",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
];

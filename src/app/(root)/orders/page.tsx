"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderColumns/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import { CircleChevronRight } from "lucide-react";

import Link from "next/link";

const Orders = async () => {
  const { userId } = auth();
  if (!userId) {
    return (
      <h1 className="my-10 mx-10 ">
        Bạn chưa ,<Link href={"/sign-in"}>đăng nhập.</Link>.
      </h1>
    );
  }
  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-heading3-bold">Đơn hàng của bạn</p>
        <Link
          href="/orders/handmade"
          className="flex items-center gap-3 border rounded-lg px-4 py-3 hover:bg-black hover:text-white max-md:hidden"
        >
          <p className="text-base-bold">Đặt hàng gia công</p>
          <CircleChevronRight className="h-5 w-5" />
        </Link>
      </div>
      <Separator className="bg-grey-3 mb-4" />
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold my-5">Bạn chưa có đơn hàng!</p>
        ))}

      <div className="flex flex-col gap-10">
        <DataTable columns={columns} data={orders} searchKey="_id" />
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";

"use client";
import React, { useEffect, useState } from "react";
import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PenLine, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const CartPage = () => {
  const cart = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users`, { method: "GET" });
        const data = await res.json();
        setSignedInUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart.cartItems,
          information: signedInUser,
          customer,
        }),
      });
      if (res.status === 200) {
        toast.success("Order placed successfully!");
        // Thực hiện các hành động sau khi thanh toán thành công, ví dụ như redirect hoặc làm sạch giỏ hàng
        router.push("/success");
      } else {
        toast.error("Failed to place order. Please try again.");
        // Xử lý các hành động khi thanh toán thất bại
      }
    } catch (error) {
      console.log("[checkout_post]: ", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex gap-20 py-8 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div className="h-[400px] overflow-y-auto">
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex w-2/3">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-[100px] h-[100px] object-cover max-w-[100px]"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold text-blue-1 truncate w-48">
                      {cartItem.item.title}
                    </p>
                    {cartItem.color && (
                      <p className="text-small-medium">{cartItem.color}</p>
                    )}
                    <p className="text-base-bold">
                      {cartItem.item.price * cartItem.quantity}.000đ
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash2
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-1/3 max-sm:w-full max-md:w-2/3 max-lg:w-1/2 flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <div>
          <p className="text-heading4-bold pb-8">
            Đã chọn:{" "}
            <span>{`(${cart.cartItems.length} ${
              cart.cartItems.length > 1 ? "items" : "item"
            })`}</span>
          </p>
          <div className="flex justify-between text-body-semibold pb-8">
            <span>Tổng cộng</span>
            <span> {total}.000đ</span>
          </div>
          {/* Thông tin đặt hàng */}

          <div className="flex flex-col ">
            <div className="mb-4 flex">
              <span className="text-heading4-bold mr-2">
                Thông tin nhận hàng:
              </span>
              <span
                className="flex text-body-semibold text-blue-1 items-center cursor-pointer"
                onClick={() => router.push("/information")}
              >
                <PenLine size={16} className="mr-1" />
                {signedInUser?.fullName ? "Sửa" : "Thêm"}
              </span>
            </div>

            {signedInUser?.phone ? (
              <>
                <div className="flex items-center">
                  <div className="mb-4 mr-8">
                    <label className="block text-sm font-medium text-body-semibold">
                      Tên:
                    </label>
                    <span className="text-lg">{signedInUser?.fullName}</span>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-body-semibold">
                      Điện thoại:
                    </label>
                    <span className="text-lg">{signedInUser?.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-body-semibold">
                    Địa chỉ:
                  </label>
                  <span className="text-lg">{signedInUser?.address}</span>
                </div>
              </>
            ) : (
              <div className="mb-4 text-gray-800 italic">Chưa có thông tin</div>
            )}
          </div>

          {/* Hết */}
          <button
            className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white disabled:text-gray-200 disabled:hover:bg-white"
            onClick={handleCheckout}
            disabled={
              cart.cartItems.length === 0 || signedInUser?.fullName === ""
            }
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

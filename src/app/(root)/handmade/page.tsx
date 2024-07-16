"use client";
import HandmadeForm from "@/components/handmade/page";
import { Separator } from "@/components/ui/separator";
import { getHandmadeOrder } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

const Handmade = () => {
  const { user } = useUser();
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [handmadeOrder, setHandmadeOrder] = useState<HandmadeType[]>([]);

  useEffect(() => {
    const fetchUserAndOrder = async () => {
      try {
        const [userRes, orderRes] = await Promise.all([
          fetch(`/api/users`, { method: "GET" }),
          getHandmadeOrder(),
        ]);

        const userData = await userRes.json();
        setSignedInUser(userData);
        setHandmadeOrder(orderRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndOrder();
  }, []);

  return (
    <div className="flex gap-20 py-5 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <HandmadeForm disable={!signedInUser?.phone} />
      </div>
      <div
        className="w-1/3 max-lg:w-full flex flex-col bg-grey-1 rounded-lg px-4 py-5 "
        style={{ maxHeight: `calc(100vh - 120px)` }}
      >
        <p className="text-heading4-bold w-full flex items-center justify-center">
          Sản phẩm đã đặt
        </p>
        <Separator className="bg-grey-3 mb-7" />
        <div className="overflow-y-auto">
          {handmadeOrder ? (
            <div className="flex flex-wrap justify-center items-center gap-10">
              {handmadeOrder
                .filter((item) => item.clerkId === user?.id)
                .map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-2 justify-center items-center"
                  >
                    <div>
                      <Image
                        src={item.image}
                        alt="image"
                        width={200}
                        height={200}
                        className="h-[250px] rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-base-bold">{item.title}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col">Bạn chưa đặt sản phẩm nào!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Handmade;

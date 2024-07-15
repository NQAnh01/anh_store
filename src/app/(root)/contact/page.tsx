"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ContactUsPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center my-20 ">
      <div className="text-center flex">
        <div>
          {isClient && (
            <Image src="/logo.png" alt="logo" width={400} height={400} />
          )}
        </div>
        <div>
          <p className="text-heading4-bold text-left mb-2">
            Đá Quý Phong Thủy Bon11 _ Vòng Tay Của Bon
          </p>
          <ul className="text-left list-disc list-inside">
            <li>Cung cấp sỉ & lẻ trang sức</li>
            <li>
              Gia công theo yêu cầu các sản phẩm trang sức bằng đá, vàng, bạc,
              dây đẹt, ...
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-heading4-bold text-left mb-2">Liên hệ:</p>
        <Separator className="bg-grey-3" />
        <ol className="text-left space-y-2">
          <li>Zalo/SDT: 0776.913.939</li>
          <li>
            Shopee:{" "}
            <a
              href="https://shopee.vn/shop/1031831473"
              className="text-blue-400 hover:underline"
            >
              https://shopee.vn/shop/1031831473
            </a>
          </li>
          <li>
            Tiktok:{" "}
            <a
              href="https://www.tiktok.com/@daquyphongthuybon11"
              className="text-blue-400 hover:underline"
            >
              https://www.tiktok.com/@daquyphongthuybon11
            </a>
          </li>
          <li>
            Tiktokshop:{" "}
            <a
              href="https://www.tiktok.com/@daquyphongthuybon1197"
              className="text-blue-400 hover:underline"
            >
              https://www.tiktok.com/@daquyphongthuybon1197
            </a>
          </li>
          <li>
            Ins:{" "}
            <a
              href="https://www.instagram.com/daquyphongthuybon11/"
              className="text-blue-400 hover:underline"
            >
              https://www.instagram.com/daquyphongthuybon11/
            </a>
          </li>
          <li>
            Lazada:{" "}
            <a
              href="https://www.lazada.vn/shop/da-quy-phong-thuy-bon11"
              className="text-blue-400 hover:underline"
            >
              https://www.lazada.vn/shop/da-quy-phong-thuy-bon11
            </a>
          </li>
          <li>
            Fanpage:{" "}
            <a
              href="https://www.facebook.com/trangsucdaphongthuybon11"
              className="text-blue-400 hover:underline"
            >
              https://www.facebook.com/trangsucdaphongthuybon11
            </a>
          </li>
          <li>
            Youtube:{" "}
            <a
              href="https://www.youtube.com/channel/UCLPuDw5oDh05W261_R1_ZYQ"
              className="text-blue-400 hover:underline"
            >
              https://www.youtube.com/channel/UCLPuDw5oDh05W261_R1_ZYQ
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ContactUsPage;

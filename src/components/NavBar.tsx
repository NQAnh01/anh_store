"use client";
import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div className=" flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-blue-1 ${pathname === "/" && "text-blue-1"}`}
        >
          Home
        </Link>
      </div>
      <div className="relative flex gap-4 text-base-bold">
        <Link
          href="/cart"
          className={`hover:text-blue-1 ${
            pathname === "/cart" && "text-blue-1"
          }`}
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        {user && (
          <Menu
            className="cursor-pointer lg:hidden"
            onClick={() => {
              setDropdownMenu(!dropdownMenu);
            }}
          />
        )}
        {user && dropdownMenu && (
          <div className="absolute">
            <Link href={"/wishlist"} className="hover:text-blue-1">
              Wishlist
            </Link>
            <Link href={"/orders"} className="hover:text-blue-1">
              Orders
            </Link>
          </div>
        )}
        {user ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <CircleUserRound />
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;

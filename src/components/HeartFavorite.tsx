"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

const HeartFavorite = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
      });
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id));
      setLoading(false);
    } catch (error) {
      console.log("[USER_GET]: ", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  const handleLiked = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (!user) {
        router.push("/sign-in");
        return;
      }

      setLoading(true);
      const res = await fetch("/api/users/wishlist", {
        method: "POST",
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const updateUser = await res.json();
      setSignedInUser(updateUser);
      setIsLiked(updateUser.wishlist.includes(product._id));
    } catch (error) {
      console.log("[Wishlist_POST]: ", error);
    }
  };
  return (
    <button onClick={handleLiked}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;

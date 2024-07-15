"use client";
import InformationForm from "@/components/information/InformationForm";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const InformationPage = () => {
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const { user } = useUser();
  console.log("User: ", user?.fullName);

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

  const initialData = {
    fullName: user?.fullName ? user.fullName : signedInUser?.fullName || "",
    phone: signedInUser?.phone || "",
    address: signedInUser?.address || "",
  };

  return (
    <div className="flex justify-center mt-8">
      {/* Sử dụng key để force component render lại khi initialData thay đổi */}
      <InformationForm key={signedInUser?.fullName} initialData={initialData} />
    </div>
  );
};

export default InformationPage;

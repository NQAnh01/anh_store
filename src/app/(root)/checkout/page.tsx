import InformationForm from "@/components/information/InformationForm";
import React from "react";

const Checkout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-10 bg-white rounded shadow-md">
        <InformationForm />
      </div>
    </div>
  );
};

export default Checkout;

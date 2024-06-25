"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

// Define the schema
const formSchema = z.object({
  fullName: z.string().min(1, "Không được để trống"),
  phone: z.string().min(1, "Không được để trống"),
  address: z
    .string()
    .min(5, "Địa chỉ không để trống")
    .max(500, "Không dài quá 500 ký tự"),
});

interface FormProps {
  initialData?: {
    fullName: string;
    phone: string;
    address: string;
  } | null;
  disable?: boolean;
}

const InformationForm: React.FC<FormProps> = ({
  initialData,
  disable = false,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          fullName: "",
          phone: "",
          address: "",
        },
    mode: "onBlur",
  });
  const { errors } = form.formState;

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (e.currentTarget.tagName === "TEXTAREA") {
        e.preventDefault();
        const textarea = e.currentTarget as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue =
          textarea.value.substring(0, start) +
          "\n" +
          textarea.value.substring(end);
        textarea.value = newValue;

        textarea.selectionStart = textarea.selectionEnd = start + 1;

        const event = new Event("input", { bubbles: true });
        textarea.dispatchEvent(event);
      } else {
        e.preventDefault();
      }
    }
  };

  const handleCheckout = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users`, {
        method: "POST",

        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Result: ", data);
      // Handle successful checkout, e.g., redirecting or showing a success message
      toast.success("Order placed successfully!");
      // Optionally, you can redirect or reset the form here
      router.push("/cart");
    } catch (error) {
      console.log("[Buy_POST]", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-10 max-w-lg w-full bg-grey-1">
      <p className="text-heading3-bold text-blue-1 text-center">
        Thông tin giao hàng
      </p>
      <Separator className="bg-grey-1 mt-4 mb-7 bg-blue-1" />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckout)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Họ và tên"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Số điện thoại"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Địa chỉ"
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex">
              <Button
                type="submit"
                className="mr-1 w-1/2"
                disabled={loading || disable || Object.keys(errors).length > 0}
              >
                Lưu
              </Button>
              <Button
                type="button"
                className="w-1/2"
                onClick={() => router.push("/")}
                disabled={loading || disable}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InformationForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
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
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(5000).trim(),
  image: z.string(),
});

type HandmadeFormProps = {
  disable?: boolean;
};

const HandmadeForm: React.FC<HandmadeFormProps> = ({ disable = false }) => {
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

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    mode: "onBlur",
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      if (e.currentTarget.tagName === "TEXTAREA") {
        // Thêm dòng mới trong textarea
        e.preventDefault();
        const textarea = e.currentTarget as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Chèn dòng mới vào vị trí con trỏ
        const newValue =
          textarea.value.substring(0, start) +
          "\n" +
          textarea.value.substring(end);
        textarea.value = newValue;

        // Đặt lại vị trí con trỏ
        textarea.selectionStart = textarea.selectionEnd = start + 1;

        // Kích hoạt sự kiện thay đổi (change event) để cập nhật giá trị
        const event = new Event("input", { bubbles: true });
        textarea.dispatchEvent(event);
      } else {
        // Ngăn chặn hành động mặc định cho các phần tử khác như input
        e.preventDefault();
      }
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submit: ", { values, customer, signedInUser });
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/handmade`, {
        method: "POST",
        body: JSON.stringify({
          product: values,
          information: signedInUser,
          customer,
        }),
      });
      if (res.ok) {
        setLoading(false);
        toast.success("Created");
        window.location.href = "/orders/handmade";
        router.push("/orders/handmade");
      }
    } catch (error) {
      console.log("[Collection_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <p className="text-heading2-bold">Create Order </p>
      </div>
      <Separator className="bg-grey-3 mb-7" />
      {disable ? (
        <div>
          <p>
            Bạn phải cập nhật thông tin khách hàng trước khi thực hiện đặt hàng.
          </p>
          <p
            className="cursor-pointer text-blue-500"
            onClick={() => router.push("/cart")}
          >
            Cập nhật ngay!
          </p>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input title"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Input description"
                        {...field}
                        rows={5}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
                <Button type="submit" className="mr-1" disabled={disable}>
                  Submit
                </Button>
                <Button type="button" onClick={() => router.push("/")}>
                  Discard
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default HandmadeForm;

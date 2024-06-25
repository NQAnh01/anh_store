// import User from "@/lib/models/User";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    // When the user sign-in for the 1st, immediately we will create a new user for them
    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    const { fullName, phone, address } = await req.json();

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    await connectToDB();

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { fullName, phone, address }
    );
    // await

    return NextResponse.json(user, { status: 200 });
    // const user = await User.findOneAndUpdate({ clerkId: id }, infor);
    // return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

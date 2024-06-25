import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Match all routes except those containing a period or "_next"
    "/", // Match the root route
    "/(api|trpc)(.*)", // Match API and trpc routes
  ],
};

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Middleware to protect userProfile routes
export async function middleware(req) {
  // Get the session token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // Otherwise, allow access
  return NextResponse.next();
}

// Apply middleware only to /userProfile and its subroutes
export const config = {
  matcher: ["/userProfile/:path*"],
};

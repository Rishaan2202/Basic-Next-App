import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function proxy(request) {

  const url = new URL(request.url);
  const cookieStore = await cookies();

  console.log(cookieStore.get("isLoggedIn"));
  
  if (cookieStore.get("isLoggedIn")?.value !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*", "/shop/:path*", "/explore/:path*", "/about/:path*"
  ],
};
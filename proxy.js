import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

export async function proxy(request) {

  const url = new URL(request.url);
  const cookieStore = await cookies();

  console.log(cookieStore.get("isLoggedIn"));

  if (cookieStore.get("isLoggedIn")?.value !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/admin")) {
    
    const db = await getDatabase();

    const roleData = await db.collection("userData").findOne({ user: cookieStore.get("userId")?.value }, { projection: { "event_details.role": 1 } });
    const role = roleData.event_details?.role === "Admin";

    if (!role) {
      return (
        NextResponse.redirect(new URL("/unauthorised", request.url))
      );
    }
  }

  if (url.pathname.startsWith("/review")) {
    
    const db = await getDatabase();

    const roleData = await db.collection("userData").findOne({ user: cookieStore.get("userId")?.value }, { projection: { "event_details.role": 1 } });
    const role = roleData.event_details?.role === "Reviewer" || "Admin";

    if (!role) {
      return (
        NextResponse.redirect(new URL("/unauthorised", request.url))
      );
    }
  }

  if (url.pathname.startsWith("/projects/create")) {

    const db = await getDatabase();

    const hackatimeStatusData = await db.collection("userData").findOne({ user: cookieStore.get("userId")?.value }, { projection: { "event_details.activity.public": 1 } });
    const hackatimeStatus = hackatimeStatusData.event_details?.activity?.public.some((activity) => activity.message === "Hackatime Linked");
    
    if (!hackatimeStatus) {
      return (
        NextResponse.redirect(new URL("/projects/link", request.url))
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*", "/shop/:path*", "/explore/:path*", "/about/:path*", "/projects/:path*"
  ]
};

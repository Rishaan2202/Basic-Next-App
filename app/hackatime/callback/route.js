import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

console.log("Hackatime callback route accessed");

export async function GET(request) {

    const cookieStore = await cookies();
    const db = await getDatabase();
    const now = new Date;

    const userId = cookieStore.get("userId")?.value;
    console.log("Retrieved user ID for hackatime purpose:", userId);

    const { searchParams } = new URL(request.url);
    console.log("All incoming URL params:", Object.fromEntries(searchParams));
    const code = searchParams.get("code");

    console.log("Received code from Hackatime callback:", code);

    if (!code) {
        return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }

    try{
        const hackatimeResponse = await fetch("https://hackatime.hackclub.com/oauth/token", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.HACKATIME_UID,
                client_secret: process.env.HACKATIME_SECRET,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI,
            })
        });

        const hackatimeData = await hackatimeResponse.json();

        console.log("Hackatime OAuth token response:", hackatimeData);

        if (!hackatimeResponse.ok) {
            return NextResponse.json({ error: "Failed to exchange code for token", details: hackatimeData }, { status: 500 });
        }

        const hackatimeUserResponse = await fetch("https://hackatime.hackclub.com/api/v1/authenticated/me", {
            headers: { 'Authorization': `Bearer ${hackatimeData.access_token}` },
        });

        const hackatimeUserData = await hackatimeUserResponse.json();

        console.log("Hackatime user data fetched:", hackatimeUserData);

        /* ------ Fetching User Stats ------ */
        const hackatimeProjectsResponse = await fetch(`https://hackatime.hackclub.com/api/v1/authenticated/projects?include_archived=true&projects=&since=&until=&until_date=&start=&end=&start_date=&end_date=`, {
            headers: { 'Authorization': `Bearer ${hackatimeData.access_token}` },
        });

        const hackatimeProjectsData = await hackatimeProjectsResponse.json();

        console.log("Hackatime user stats fetched:", hackatimeProjectsData);


            await db.collection("userData").updateOne(
                { user: userId },
                { $set: { hackatime_data: { user_info: hackatimeUserData, data: hackatimeProjectsData } } },
            );

        if (!hackatimeUserResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch Hackatime user data", details: hackatimeUserData }, { status: 500 });
        } else {
            await db.collection("userData").updateOne(
                { user: userId },
                { $push: { "event_details.activity.public": {message: "Hackatime Linked", timestamp: now}} }
            );
            return NextResponse.redirect(`http://localhost:3000/home`);
        }
    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }
}
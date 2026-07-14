import { NextResponse } from "next/server";
import { users } from "../../data/users";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    console.log("All incoming URL params:", Object.fromEntries(searchParams));
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }
    try {
        const tokenResponse = await fetch("https://auth.hackclub.com/oauth/token", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID,
                client_secret: process.env.HACKCLUB_CLIENT_SECRET,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: "Failed to exchange code for token", details: tokenData }, { status: 500 });
        }

        const userResponse = await fetch("https://auth.hackclub.com/api/v1/me", {
            headers: { 'Authorization': `Bearer ${tokenData.access_token}` },
        });

        const userData = await userResponse.json();
        console.log("User data fetched from Hack Club API:", userData);
        users.push({ id: users.length + 1, name: userData.name, projects: [], Balance: 0 });
        console.log("Updated users array:", users);

        if (!userResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch user data", details: userData }, { status: 500 });
        }

        return NextResponse.redirect("http://localhost:3000/home");
    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }
}
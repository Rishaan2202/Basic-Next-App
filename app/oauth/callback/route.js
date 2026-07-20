import { NextResponse } from "next/server";
import { users } from "../../data/users";
import { cookies } from "next/headers";

class User {
  constructor(id, name, projects, balance, email, slackID, verificationStatus, yswsEligible, address, pfp) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.balance = balance;
    this.slackID = slackID;
    this.verificationStatus = verificationStatus;
    this.yswsEligible = yswsEligible;
    this.projects = projects;
    this.address = address; // Add address property
    this.pfp = pfp; // Sync pfp from Slack API
    this.purchaseHistory = []; // Initialize purchase history as an empty array
  }
}

export async function GET(request) {

    const cookieStore = await cookies();

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
        console.log("Updated users array:", users);

        if (!userResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch user data", details: userData }, { status: 500 });
        }

    try {
        const tokenResponse = await fetch(`https://slack.com/api/users.info?user=${userData.identity.slack_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
            }
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: "Failed to exchange code for token", details: tokenData }, { status: 500 });
        }

        console.log(userData);
        users.push(new User(userData.identity.id, userData.identity.first_name + " " + userData.identity.last_name, 0, userData.identity.primary_email, userData.identity.slack_id, userData.identity.verification_status, userData.identity.ysws_eligible, [], null, tokenData.user.profile.image_original));
        console.log("Updated users array:", users);
        console.log("Slack API response:", tokenData);

        cookieStore.set("userId", userData.identity.id);
        const userPfp = tokenData.user.profile.image_original;

    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }

        return NextResponse.redirect("http://localhost:3000/home");
    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }
}
import { NextResponse } from "next/server";
import { users } from "../data/users";


export async function GET(request) {
    
    const userId = users.slackID;
    console.log("Fetching Slack user info for userId:", userId);

    try {
        const tokenResponse = await fetch(`https://slack.com/api/users.info?user=${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
            }
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return NextResponse.json({ error: "Failed to exchange code for token", details: tokenData }, { status: 500 });
        }

        console.log("Slack API response:", tokenData);
        return NextResponse.json({ user: tokenData.user });

    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }
}
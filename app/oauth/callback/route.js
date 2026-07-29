import { NextResponse } from "next/server";
import { users } from "../../data/users";
import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request) {

    const cookieStore = await cookies();
    const db = await getDatabase();

    console.log(request.url);

    const { searchParams } = new URL(request.url);
    console.log("All incoming URL params:", Object.fromEntries(searchParams));
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }

    try {

        /* OAuth Flow */

        // Exchange the code for an access token
        const authResponse = await fetch("https://auth.hackclub.com/oauth/token", {
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

        const authData = await authResponse.json();

        if (!authResponse.ok) {
            return NextResponse.json({ error: "Failed to exchange code for token", details: authData }, { status: 500 });
        }

        // Fetch User Data
        const userResponse = await fetch("https://auth.hackclub.com/api/v1/me", {
            headers: { 'Authorization': `Bearer ${authData.access_token}` },
        });

        const userData = await userResponse.json();
        console.log("User data fetched from Hack Club API:", userData);
        console.log("Updated users array:", users);

        if (!userResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch user data", details: userData }, { status: 500 });
        }

        /* Slack API Integration */
        const slackResponse = await fetch(`https://slack.com/api/users.info?user=${userData.identity.slack_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.SLACK_ACCESS_TOKEN}`,
            }
        });

        const slackData = await slackResponse.json();

        if (!slackResponse.ok) {
            return NextResponse.json({ error: "Failed to fetch Slack user data", details: slackData }, { status: 500 });
        }

        // Create or Update User in Memory
        console.log(userData);

        const existingUser = await db.collection("userData").findOne({ user: userData.identity.id });

        if (existingUser) {
            await db.collection("userData").updateOne(
                {
                    user: userData.identity.id
                },
                {
                    $set: {
                        name: userData.identity.first_name + " " + userData.identity.last_name,
                        projects: 0,
                        email: userData.identity.primary_email,
                        slackID: userData.identity.slack_id,
                        verificationStatus: userData.identity.verification_status,
                        yswsEligible: userData.identity.ysws_eligible,
                        activity: [`OAuth Successful`],
                        address: null,
                        pfp: slackData.user.profile.image_original,
                        srNo: users.length,
                        slackDetails: slackData,
                        hackatime_data: []
                    }
                },
                {
                    upsert: true
                }
        )
        }

        else {

            await db.collection("userData").insertOne(
                
                     {
                        user: userData.identity.id,
                        name: userData.identity.first_name + " " + userData.identity.last_name,
                        projects: 0,
                        email: userData.identity.primary_email,
                        slackID: userData.identity.slack_id,
                        verificationStatus: userData.identity.verification_status,
                        yswsEligible: userData.identity.ysws_eligible,
                        activity: ["Successfull Login"],
                        address: null,
                        pfp: slackData.user.profile.image_original,
                        srNo: users.length,
                        slackDetails: slackData,
                        hackatime_data: []
                    
                },
            );
        }


        console.log("Updated users array:", users);
        console.log("Slack API response:", slackData);

        cookieStore.set("userId", userData.identity.id, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });

        console.log("User ID stored in cookie:", userData.identity.id);

        return NextResponse.redirect(`https://hackatime.hackclub.com/oauth/authorize?client_id=${process.env.HACKATIME_UID}&redirect_uri=${process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI}&response_type=code&scope=profile+read`);
    }
    catch (error) {
        return NextResponse.json({ error: "An unexpected error occurred", details: error.message }, { status: 500 });
    }
}
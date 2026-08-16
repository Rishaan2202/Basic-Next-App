    "use server"

    import { getDatabase } from "@/lib/mongodb";
    import { cookies } from "next/headers";

    export async function Activity(activity, description, type) {

        const db = await getDatabase();
        const cookieStore = await cookies();

        const now = new Date();

        try {

            if (type === "public") {
                await db.collection("userData").updateOne(
                    { user: cookieStore.get("userId")?.value },
                    {
                        $push: {
                            "event_details.activity.public": { message: activity, description: description, timestamp: now }
                        }
                    }
                );
            }

            else {
                await db.collection("userData").updateOne(
                    { user: cookieStore.get("userId")?.value },
                    {
                        $push: {
                            "event_details.activity.private": { message: activity, description: description, timestamp: now }
                        }
                    }
                );
            } // Gotta change this in future as this would result in the change in activity of the admin doing the changes!!!
        }

        catch (error) {
            console.error("Error occurred while updating activity:", error);
        }

    }
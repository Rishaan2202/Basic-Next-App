import { getDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function Activity(activity, description, type, timestamp) {

    const db = await getDatabase();
    const cookieStore = await cookies();

    try {

        if (type === "public") {
            db.collections("userData").updateOne(
                { user: cookieStore.get("userId")?.value },
                {
                    $push: {
                        "event_details.activity.public": { message: activity, description: description, timestamp: timestamp }
                    }
                }
            );
        }

        else {
            db.collections("userData").updateOne(
                { user: cookieStore.get("userId")?.value },
                {
                    $push: {
                        "event_details.activity.private": { message: activity, description: description, timestamp: timestamp }
                    }
                }
            );
        } // Gotta change this in future as this would result in the change in activity of the admin doing the changes!!!
    }

    catch (error) {
        console.error("Error occurred while updating activity:", error);
    }

}
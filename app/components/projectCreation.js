"use server"

import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

export async function ProjectCreation(name, description) {

    const cookieStore = await cookies();
    const db = await getDatabase();

    try {
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            throw new Error("User ID not found in cookies while project creation");
        } else {
            await db.collection("userData").updateOne(
                { user: userId },
                {
                    $set: {
                        "event_details.projects": { name: name, description: description },
                    },
                    $push: {
                        "event_details.activity.public": { message: "Created Project" + name, timestamp: now }
                    }
                }
            );
        }

    }

    catch (error) {
        throw new Error("Error during project creation: " + error.message);
    }
}
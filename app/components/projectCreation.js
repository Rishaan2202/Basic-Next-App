"use server"

import { cookies } from "next/headers";
import { getDatabase } from "@/lib/mongodb";

export async function ProjectCreation(name, description, demo_url, code_url, hackatime_project_name, id) {

    const cookieStore = await cookies();
    const db = await getDatabase();

    const now = new Date();

    try {

        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            throw new Error("User ID not found in cookies while project creation");
        } else {
            await db.collection("userData").updateOne(
                { user: userId },
                {
                    $push: {
                        "event_details.projects": { name: name, description: description, demo: demo_url, code: code_url, hackatime_project_name: hackatime_project_name, id: id },
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
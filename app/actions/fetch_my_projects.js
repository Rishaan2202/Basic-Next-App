import { getDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function fetchMyProjects() {

    try {

        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        const db = await getDatabase();
        const projects = await db.collection("userData").find({ user: userId }, { projection: { _id: 0, "event_details.projects": 1 } }).toArray();

        const allProjects = projects.flatMap(user => user.event_details?.projects || []);

        console.log("Fetched my projects:", allProjects);

        if(!userId) {
            throw new Error("User ID not found in cookies.");
        }

        if (!projects) {
            throw new Error("No projects found for the user.");
        }

        if (!Array.isArray(allProjects)) {
            throw new Error("Projects data is not in the expected format.");
        }

        return allProjects;

    }
    catch (error) {
        console.error("Error fetching my projects:", error);
        throw error;
    }
}
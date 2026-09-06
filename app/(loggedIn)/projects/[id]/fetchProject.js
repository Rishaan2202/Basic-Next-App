    import { getDatabase } from "@/lib/mongodb";

    export async function fetchProject(projectId) {
        const db = await getDatabase();
        const user = await db.collection("userData").findOne({ "event_details.projects.id": projectId }, { projection: { "_id": 0, "event_details.projects.$": 1 } });
        const project = user?.event_details?.projects?.[0] || null;
        console.log("Fetched project from MongoDB:", project);
        return project;
    }
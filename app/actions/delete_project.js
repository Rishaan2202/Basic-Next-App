import { getDatabase } from "@/lib/mongodb";

export async function deleteProject(projectId) {
    const db = await getDatabase();
    // const event_details = await db.collection("userData").findOne({ "event_details.projects.id": projectId }, { projection: { "_id": 0, "event_details.projects.$": 1 } });
    // const project = event_details?.event_details?.projects?.[0] || null;
    const result = await db.collection("userData").deleteOne(
        { "event_details.projects.id": projectId },
    );
    console.log("Delete operation result:", result);
    return result.modifiedCount > 0;
}
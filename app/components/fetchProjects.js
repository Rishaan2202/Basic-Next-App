"use server"

import { getDatabase } from "@/lib/mongodb";

export async function FetchProjects() {
    const db = await getDatabase();
    const projects = await db.collection("userData").find({}, { projection: { "event_details.projects": 1 } }).toArray();
    return projects;
}
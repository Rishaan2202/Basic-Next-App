"use server"

import { getDatabase } from "@/lib/mongodb";

export async function FetchProjects() {

    const db = await getDatabase();
    const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "hackatime_data.data.projects": 1 } }).toArray();

    return projects;
}
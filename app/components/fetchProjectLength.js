"use server"

import { getDatabase } from "@/lib/mongodb";

export async function Length() {

    const db = await getDatabase();
    
    const projectsLength = (db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } })).toArray().then(users => {
        const allProjects = users.flatMap(user => user.event_details?.projects || []);
        return allProjects.length + 1;
    });
    
    return projectsLength;

}
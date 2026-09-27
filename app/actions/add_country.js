"use server"

import { getDatabase } from "@/lib/mongodb";

export async function addCountry(userId, country) {
    const db = await getDatabase();
    const users = db.collection("userData");

    const result = await users.updateOne(
        { "user": userId },
        { $set: { "event_details.country": country } }
    );

    return result;
}
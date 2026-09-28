"use server"

import { getDatabase } from "@/lib/mongodb";

export async function addOnboardInfo(userId, country, intent) {
    const db = await getDatabase();
    const users = db.collection("userData");

    const result = await users.updateOne(
        { "user": userId },
        { $set: { "event_details.country": country, "event_details.intent": intent } }
    );

    return result;
}
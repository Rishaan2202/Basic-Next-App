import { getDatabase } from "@/lib/mongodb";

export async function getUsers() {
    const db = await getDatabase();
    const users = await db.collection("userData").find({}).toArray();
    return users;
}
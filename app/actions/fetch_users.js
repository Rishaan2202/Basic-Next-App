import { getDatabase } from "@/lib/mongodb";

export async function fetchUsers() {
  const db = await getDatabase();
  const users = await db.collection("userData").find({}, { projection: { "_id": 0 } }).toArray();
  return users;
}
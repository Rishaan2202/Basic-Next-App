import { getDatabase } from "@/lib/mongodb";

export async function fetchUsers(id) {
  const db = await getDatabase();
  const users = await db.collection("userData").find({ user: id }, { projection: { "_id": 0 } }).toArray();
  return users;
}
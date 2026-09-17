import { getDatabase } from "@/lib/mongodb";

export async function fetchActivity() {
  const db = await getDatabase();
  const announcements = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.activity": 1}  }).toArray();
  return announcements;
}


"use server"

import { getDatabase } from '@/lib/mongodb'

export async function Items() {
  const db = await getDatabase();
  const items = await db.collection("shop_items").find().toArray();
  return items;
}
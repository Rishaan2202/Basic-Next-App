"use server"

import { getDatabase } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Activity } from "@/app/actions/activity"

export async function Purchase({name, price}) {

    console.log("Purchase function called with item:", { name, price });
    
    const db = await getDatabase();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    await db.collection("userData").updateOne(
        { "user": userId },
        { $push: { "event_details.purchases": {name: name, price: price, timestamp: new Date() } } }
    )

    await Activity("Shop Purchase", "Purchased " + name + " for " + price, "public");

    redirect("/shop/thanks");
}
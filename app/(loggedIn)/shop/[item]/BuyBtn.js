"use server"

import { getDatabase } from "@/lib/mongodb"
import { cookies } from "next/headers";

const BuyBtn = async ({params}) => {

    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const db = await getDatabase();

    return (
        <>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={async () => {
            {await db.collection("userData").updateOne(
                { "name": userId },
                { $push: { "event_details.purchases": params.item } }
            )}
        }}>
            Buy
        </button>
        </>
    )
}

export default BuyBtn

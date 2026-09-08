import React from 'react'
import { getDatabase } from '@/lib/mongodb'
import BuyBtn from './BuyBtn'

const BuyPage = async ({ params }) => {

    const Item = await params;

    const db = await getDatabase();
    const item = await db.collection("shop_items").findOne({ name: Item.item });

    console.log("Item details:", item.toString());

    if (!item) {
        return (
            <h1>Item not found</h1>
        )
    }

    return (
        <div className="absolute left-50 top-20 w-1/2">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <h2>Price: ${item.price}</h2>
            <BuyBtn name={item.name} price={item.price} />
        </div>
    )
}

export default BuyPage
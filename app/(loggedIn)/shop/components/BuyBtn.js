"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

const BuyBtn = ({ item }) => {

    console.log("BuyBtn component rendered with item name:", item);

    const router = useRouter();

    const handlePurchase = (i) => {
        router.push(`/shop/${i}`);
    }

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => handlePurchase(item)}>Buy</button>
    )
}

export default BuyBtn

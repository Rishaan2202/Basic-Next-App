"use client";

import React from 'react'
import { useRouter } from 'next/navigation';

const BuyBtn = ({name}) => {

    console.log("BuyBtn component rendered with item name:", name);

    const router = useRouter();

    const handlePurchase = (item) => {
        router.push(`/shop/${item}`);
    }

    return (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => handlePurchase(name)}>Buy</button>
    )
}

export default BuyBtn

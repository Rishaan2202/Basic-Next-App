"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import '@/app/globals.css'

const BuyBtn = ({ item }) => {

    console.log("BuyBtn component rendered with item name:", item);

    const router = useRouter();

    const handlePurchase = (i) => {
        router.push(`/shop/${i}`);
    }

    return (
        <button className="bg-[var(--tertiary)] text-black px-4 py-2 rounded mt-2 hover:scale-[1.1] hover:cursor-pointer" onClick={() => handlePurchase(item)}>Buy</button>
    )
}

export default BuyBtn

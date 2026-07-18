"use client"

import React from 'react'
// import { users } from "../../data/users"
// import { shopItems } from "../../../data/items"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const BuyPage = () => {

    const searchParams = useSearchParams()

    const name = searchParams.get('name')
    const price = searchParams.get('price')
    const id = searchParams.get('itemId')

    const handlePurchase = (item) => {
        console.log(`You have purchased ${item.name} for $${item.price}!`);
        // Implementation for purchasing an item
    }

    return (
        <div className="absolute left-50 top-20">
            <h1>Buy Page</h1>
        </div>
    )
}

export default BuyPage

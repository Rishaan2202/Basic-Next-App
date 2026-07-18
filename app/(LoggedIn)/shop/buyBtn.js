"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const BuyBtn = ({ item, onPurchase }) => {
  const router = useRouter()

  const handlePurchase = (item) => {
    const queryString = new URLSearchParams({ itemId: item.id, name: item.name, price: item.price }).toString();
    console.log(`You have purchased ${item.name} for $${item.price}!`);
    router.push(`/shop/buy?${queryString}`);
    // Implementation for purchasing an item
  }

  return (
    <div className="absolute left-50 top-20">
      <button onClick={handlePurchase}>Buy</button>
    </div>
  )
}

export default BuyBtn
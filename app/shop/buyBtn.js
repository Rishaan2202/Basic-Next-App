"use client"

import React from 'react'
import { users } from "../data/users"
import { shopItems } from "../data/items"

const handlePurchase = (item) => {
  console.log(`You have purchased ${item.name} for $${item.price}!`);
  // Implementation for purchasing an item
}


const BuyBtn = (item) => {
  return (
    <div>
      <button onClick={() => handlePurchase(item)}>Buy</button>
    </div>
  )
}

export default BuyBtn
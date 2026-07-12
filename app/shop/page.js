import React from 'react'
import { users } from '../data/users'
import { shopItems } from '../data/items'
import BuyBtn from './buyBtn'

const handlePurchase = (item) => {
  console.log(`You have purchased ${item.name} for $${item.price}!`);
  // Implementation for purchasing an item
}

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
      <p>Welcome to the shop!</p>
      <div>
        {shopItems.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <h4>Description: {item.description}</h4>
            <p>Price: ${item.price}</p>
            <BuyBtn item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
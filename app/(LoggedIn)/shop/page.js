"use client"

import React, { useState } from 'react'
import { users } from '../../data/users'
import { shopItems } from '../../data/items'
import BuyBtn from './buyBtn'
import { useRouter } from 'next/navigation'

const Shop = () => {

  const [currentItem, setCurrentItem] = useState("")
  const router = useRouter()

  return (
    <div className="absolute left-50 top-20">
      <h1>Shop</h1>
      <p>Welcome to the shop!</p>
      <div className='bg-sky-200 p-4 rounded-lg'>
        {shopItems.map((item) => (
          <div key={item.id} className='bg-sky-600 p-4 rounded-lg'>
            <h2>{item.name}</h2>
            <h4>Description: {item.description}</h4>
            <p>Price: ${item.price}</p>
            <div className='mt-4'>
              <BuyBtn item={item}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
import React from 'react'
import { Items } from './items';
import BuyBtn from './components/BuyBtn';
import '@/app/globals.css'

const Shop = async () => {

  const items = await Items();

  console.log("Shop item fetched successfully:", items);

  return (
    <div className="absolute left-50 top-20">
      <h1 className='text-3xl text-bold'>Shop</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id.toString()} className="bg-[var(--black)] p-4 rounded-lg shadow-md">
            <h2 className="text-white text-2xl font-bold">{item.name}</h2>
            <p className="text-[var(--blue)]">{item.description}</p>
            <p className="text-[var(--green)] font-semibold">${item.price}</p>
            <BuyBtn item={item.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
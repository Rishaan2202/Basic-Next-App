import React from 'react'
import { Items } from './items';
import BuyBtn from './components/BuyBtn';

const Shop = async () => {

  const items = await Items();

  console.log("Shop item fetched successfully:", items);

  return (
    <div className="absolute left-50 top-20">
      <h1>Shop</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id.toString()} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-gray-800 font-semibold">${item.price}</p>
            <BuyBtn item={item.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
"use client"

import { Purchase } from "./addPurchase";

const BuyBtn = ({ name, price }) => {

    return (
        <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => Purchase({ name, price })}>
                Buy
            </button>
        </>
    )
}

export default BuyBtn

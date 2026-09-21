"use client"

import { Purchase } from "./addPurchase";

const BuyBtn = ({ name, price }) => {

    return (
        <>
            <button className="bg-[var(--yellow)] text-white px-4 py-2 rounded mt-2" onClick={() => Purchase({ name, price })}>
                Buy
            </button>
        </>
    )
}

export default BuyBtn

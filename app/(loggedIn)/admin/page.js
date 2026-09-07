import Link from 'next/link'
import React from 'react'
import '@/app/globals.css'

const page = () => {
  return (
    <div>
      <ul className="absolute left-[5vw] top-[13vh] bg-[var(--tertiary)] ml-50 p-2 rounded text-black w-fit">
        <li className="bg-[var(--secondary)] m-2 p-2 rounded text-black w-fit"><Link href="/admin/users">Users</Link></li>
        <li className="bg-[var(--secondary)] m-2 p-2 rounded text-black w-fit"><Link href="/admin/fulfillment">Fulfillment</Link></li>
        <li className="bg-[var(--secondary)] m-2 p-2 rounded text-black w-fit"><Link href="/admin/shop">Shop</Link></li>
        <li className="bg-[var(--secondary)] m-2 p-2 rounded text-black w-fit"><Link href="/admin/fraud-review">Fraud Review</Link></li>
      </ul>
    </div>
  )
}

export default page

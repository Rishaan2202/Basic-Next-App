import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <ul className="bg-sky-500 ml-50 p-2 rounded text-black w-fit">
        <li className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit"><Link href="/admin/users">Users</Link></li>
        <li className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit"><Link href="/admin/fulfillment">Fulfillment</Link></li>
        <li className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit"><Link href="/admin/shop">Shop</Link></li>
        <li className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit"><Link href="/admin/fraud-review">Fraud Review</Link></li>
      </ul>
    </div>
  )
}

export default page

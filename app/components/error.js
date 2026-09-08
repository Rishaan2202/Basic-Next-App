"use client"

import React from 'react'

export default function error({ name, description }) {
  return (
    <div className='flex flex-col items-center justify-center bg-red-500 text-white w-100 h-40 p-4 rounded-lg shadow-md m-5'>
      <h1>Error!!!</h1>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}

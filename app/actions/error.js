"use client"

import React from 'react'

export default function Error({ name, description }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-red-500 text-white'>
      <h1>Error!!!</h1>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  )
}

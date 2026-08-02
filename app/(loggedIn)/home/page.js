import React from 'react'
import Link from 'next/link'

console.log("Home page rendered");

export default function Home() {
  return (
    <div className="absolute left-50 top-20">
      <h1>Home</h1>
      <p>Welcome to your home page!</p>
      <h1>Projects</h1>
      <p>Welcome to your projects!</p>
      <button><Link href="/home/create">Create Project</Link></button>
    </div>
  )
}
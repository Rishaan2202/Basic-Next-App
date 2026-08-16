import React from 'react'
import Link from 'next/link'
import { getDatabase } from '@/lib/mongodb';

console.log("Home page rendered");

export default async function Home() {
  const db = await getDatabase();
  const projects = await db.collection("userData").find({}, { projection: { "_id": 0, "event_details.projects": 1 } });
  console.log("Home data fetched from MongoDB:", projects);

  return (
    <div className="absolute left-50 top-20">
      <h1 className='font-bold text-xl'>Home</h1>
      <p>Welcome to your home page!</p>
      <div className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
        <h2>Projects</h2>
        {/* <ul>
          {projects.map((user, index) => (
            <li key={index} className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
              <h2>{user.event_details.projects?.name || "Project Name"}</h2>
              <p>{user.event_details.projects?.description || "Project Description"}</p>
            </li>
          ))}
        </ul> */}
      </div>
      <button className='bg-sky-800/50 m-2 p-2 rounded hover:bg-sky-700'><Link href="/projects/create">Create Project</Link></button>
    </div>
  )
}
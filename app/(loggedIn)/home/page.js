import React from 'react'
import Link from 'next/link'
import { fetchActivity } from '@/app/actions/fetch_activity';
import '@/app/globals.css'

console.log("Home page rendered");

export default async function Home() {

  const activity = await fetchActivity();
  console.log("Fetched activity:", activity);

  return (
    <div className="absolute left-50 top-20">

      <h1 className='font-bold text-3xl'>Home</h1>

      <p>Home Sweet Home!</p>

      <div id='homeProjectsArea'>
        {/* <ul>
          {projects?.event_details?.projects?.map((user, index) => (
            <li key={index} className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
              <h2>{user.name || "Project Name"}</h2>
              <p>{user.description || "Project Description"}</p>
            </li>
          ))}
        </ul> */}
      </div>

      <button className='text-black bg-[var(--tertiary)] m-2 p-2 rounded hover:bg-[var(--tertiary)] hover:scale-[1.1]'><Link href="/projects/create">+ Create Project</Link></button>
      
      <div id='announcementsArea' className="flex flex-col items-center bg-[var(--tertiary)] m-2 p-2 rounded text-black w-[26vw] overflow-y-auto overflow-x-hidden h-[50vh]">
        <h2 className='text-2xl font-bold'>Activity</h2>
        <ul>
          {activity?.flatMap((user, index) => user?.event_details?.activity?.public?.map((item, userindex) => (
            <li key={`${index}-${userindex}`} className="flex justify-between items-center bg-[var(--secondary)] m-2 p-2 rounded text-black w-[23vw]">
              <p className='text-[var(--primary)]'>{item.message}</p>
              <div className='flex flex-col items-center'>
                <p className='text-[var(--tertiary)]'>{item.timestamp?.toLocaleTimeString()}</p>
                <p className='text-[var(--tertiary)]'>{item.timestamp?.toLocaleDateString()}</p>
              </div>
            </li>
          )))}
        </ul>
      </div>

    </div>
  )
}

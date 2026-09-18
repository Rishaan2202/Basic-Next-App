import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchActivity } from '@/app/actions/fetch_activity';
import { fetchMyProjects } from '@/app/actions/fetch_my_projects';
import '@/app/globals.css'

console.log("Home page rendered");

export default async function Home() {

  const activity = await fetchActivity();
  const myProjects = await fetchMyProjects();
  console.log("Fetched activity:", activity);

  return (
    <div className="absolute left-50 top-20">

      <h1 className='font-bold text-3xl'>Home</h1>

      <p>Home Sweet Home!</p>

      <div id='homeProjectsArea'>
        <h2 className='text-2xl font-bold'>My Projects</h2>
        {!myProjects || myProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul className="grid grid-cols-2 h-full">
                  {myProjects.map((user, index) => (
                    <li key={index} className="flex flex-col break-words bg-[var(--tertiary)] m-2 p-2 rounded text-black w-[25vw]">
                      <Image src={user.screenshot || "https://cdn.hackclub.com/01a09f57-fcc4-78d8-b720-d09a3e79effa/No_Image_Available.jpg"} alt="Project Screenshot" width={400} height={200} className="rounded mb-2" />
                      <h2 className="font-bold text-2xl flex justify-center">{user.name || "Project Name"}</h2> 
                      <p>{user.description || "Project Description"}</p>
                      <div className='flex justify-around mt-auto'>
                        <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%]"><a href={user.demo || "#"} target="_blank" rel="noopener noreferrer">Demo</a></button>
                        <button className="bg-[var(--secondary)] hover:bg-[var(--secondary)] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[45%] "><a href={user.code || "#"} target="_blank" rel="noopener noreferrer">Code</a></button> 
                      </div>
                    </li>
                  ))}
                </ul>
        )
        }
      </div>

      <button className='text-black bg-[var(--tertiary)] m-2 p-2 rounded hover:bg-[var(--tertiary)] hover:scale-[1.1]'><Link href="/projects/create">+ Create Project</Link></button>

      <div id='announcementsArea' className="flex flex-col items-center bg-[var(--tertiary)] m-2 p-2 rounded text-black w-[26vw] [scrollbar-width: thin] overflow-y-auto overflow-x-hidden h-[50vh]">
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

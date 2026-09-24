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
  const hours = myProjects?.flatMap((user) => user?.hours || []);
  console.log("Fetched Hours:", hours)
  console.log("Fetched activity:", activity);

  return (
    <div className="absolute left-50 top-20">

      <h1 className='font-bold text-3xl'>Home</h1>

      <p>Home Sweet Home!</p>

      <div className='absolute bg-black w-[63vw] h-[4vh] top-[3vh] left-[15vw] rounded-xl'></div>
      <div className='absolute bg-[var(--blue)] w-[23vw] h-[4vh] top-[3vh] left-[15vw] rounded-xl'></div>


      <div id='homeProjectsArea' className='bg-[var(--black)] m-2 p-2 w-[80vw] rounded h-[58vh] text-[var(--blue)]'>
        <h2 className='text-3xl m-2 font-bold text-[var(--yellow)]'>My Projects</h2>
        {!myProjects || myProjects.length === 0 ? (
          <Link href={`/projects/create`} className="text-[var(--primary)] hover:scale-[1.05] flex flex-col items-center justify-center border-2 border-dashed m-2 h-[94%] p-2 rounded text-black w-[13vw]">
            <h1 className='text-8xl'>+</h1>
            <h2 className="font-bold text-xl flex justify-center">Create Project</h2>
          </Link>
        ) : (
          <ul className="flex flex-nowrap gap-4 overflow-x-auto pb-4">
            {myProjects.map((user, index) => (
              <li key={index} className="hover:scale-[1.05] flex flex-col shrink-0 break-words bg-[var(--red)] m-2 h-[73%] p-2 rounded text-[var(--blue)] w-[13vw]">
                <Link href={`/home/projects/${user.id}`} className="text-[var(--primary)]">
                  <Image src={user.screenshot || "https://cdn.hackclub.com/01a09f57-fcc4-78d8-b720-d09a3e79effa/No_Image_Available.jpg"} alt="Project Screenshot" width={150} height={100} className="rounded mb-2" />
                  <h2 className="font-bold text-xl flex justify-center">{user.name || "Project Name"}</h2>
                  <div className='flex justify-around'>
                    <button className="relative bg-[var(--yellow)] text-xs hover:bg-[var(--green)] h-[5vh] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded w-[100%]"><Link href={user.demo || "#"} target="_blank">Demo</Link></button>
                    <button className="relative bg-[var(--yellow)] hover:bg-[var(--green)] h-[5vh] hover:cursor-pointer hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded text-xs w-[100%]"><Link href={`/home/projects/${user.id}` || "#"} target="_blank">Open</Link></button>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/projects/create`} className="text-[var(--red)] hover:scale-[1.05] flex flex-col items-center justify-center border-2 border-dashed m-2 h-[94%] p-2 rounded w-[13vw]">
                <h1 className='text-8xl'>+</h1>
                <h2 className="font-bold text-xl flex justify-center">Create Project</h2>
              </Link>
            </li>
          </ul>
        )
        }
      </div>

      <div className='flex'>

        <div id='announcementsArea' className="flex flex-col items-center bg-[var(--black)] m-2 p-2 rounded text-[var(--blue)] w-[50vw] [scrollbar-width: thin] overflow-y-auto overflow-x-hidden h-[50vh]">
          <h2 className='text-2xl font-bold text-[var(--yellow)]'>Activity</h2>
          <ul>
            {activity?.flatMap((user, index) => user?.event_details?.activity?.public?.map((item, userindex) => (
              <li key={`${index}-${userindex}`} className="flex justify-between items-center bg-[var(--green)] m-2 p-2 rounded text-black w-[45vw]">
                <p className='text-xl text-[var(--primary)]'>{item.message}</p>
                <div className='flex flex-col items-center'>
                  <p className='font-xl text-[var(--tertiary)]'>{item.timestamp?.toLocaleTimeString()}</p>
                  <p className='text-[var(--tertiary)]'>{item.timestamp?.toLocaleDateString()}</p>
                </div>
              </li>
            )))}
          </ul>
        </div>

        <div className="flex flex-col items-center bg-[var(--black)] m-2 p-2 rounded text-[var(--blue)] w-[29vw] [scrollbar-width: thin] overflow-y-auto overflow-x-hidden h-[50vh]">
          <h2 className='text-2xl font-bold text-[var(--yellow)]'>Announcements</h2>
          <ul className='text-xl'>
            <li className="flex justify-between items-center bg-[var(--blue)] m-2 p-2 rounded text-black w-[26vw]">
              <p className='text-[var(--primary)]'>Welcome to the new year!</p>
            </li>
            <li className="flex justify-between items-center bg-[var(--blue)] m-2 p-2 rounded text-black w-[26vw]">
              <p className='text-[var(--primary)]'>Welcome to the end of old year!</p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
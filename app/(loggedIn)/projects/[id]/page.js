import React from 'react'
import { fetchProject } from './fetchProject';
import Link from 'next/link';
import '@/app/globals.css'

const page = async ({ params }) => {

  const { id } = await params;
    
  const projectId = Number(id);
  const project = await fetchProject(projectId);

  console.log("Project ID:", projectId);
  console.log("Type", typeof projectId);
  console.log("Project details:", project);

  if (!project) {
    return (
      <div className="absolute left-50 top-20">
        <h1 className='text-2xl font-bold m-2'>Project not found!</h1>
        <p className='m-2'>Looks like this project doesn't exist, try searching for some other ones instead!</p>
      </div>
    )
  }

  return (
    <div className="bg-[var(--tertiary)] rounded mr-3 p-2 absolute left-50 top-20">
      <h1 className='text-3xl font-bold m-2'>{project.name}</h1>
      <p className='m-2 text-black'>{project.description}</p>
      <Link href={project.demo} className='bg-[var(--secondary)] hover:bg-sky-600 m-2 text-white font-bold py-2 px-4 rounded'>Demo</Link>
      <Link href={project.code} className='bg-[var(--secondary)] hover:bg-sky-600 m-2 text-white font-bold py-2 px-4 rounded'>Code</Link>
    </div>
  )
}

export default page

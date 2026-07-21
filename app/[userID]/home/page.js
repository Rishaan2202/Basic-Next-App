import React from 'react'
import { users } from '../../data/users'
import CreateBtn from './createBtn'
import Link from 'next/link'

const handleProjectCreation = () => {
    console.log("New project created!");
    users.projects.push("New Project");
  // Implementation for creating a new project
}

const Home = () => {
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

export default Home

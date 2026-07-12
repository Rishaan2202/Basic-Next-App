import React from 'react'
import { users } from '../layout'
import CreateBtn from './createBtn'

const handleProjectCreation = () => {
    console.log("New project created!");
  // Implementation for creating a new project
}

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      <p>Welcome to your projects!</p>
      <CreateBtn />
    </div>
  )
}

export default Projects

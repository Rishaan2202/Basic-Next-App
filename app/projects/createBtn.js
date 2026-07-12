"use client"

import React from 'react'
import { users } from "../data/users"

const handleProjectCreation = () => {
  console.log("New project created!");
  // Implementation for creating a new project
}


const createBtn = () => {
  return (
    <div>
      <button onClick={handleProjectCreation}>Create Project</button>
    </div>
  )
}

export default createBtn
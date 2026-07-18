"use client"

import React, { useState } from 'react'
import { users } from '../../data/users'

const Projects = () => {
  
  const allProjects = users.flatMap(user => user.projects);

  return (
    <div className="left-100">
      <h1>Explore</h1>
      <p>Welcome to the explore page!</p>
      <div>{allProjects.map((project, index) => (
        <div key={index}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}</div>
    </div>
  )
}

export default Projects
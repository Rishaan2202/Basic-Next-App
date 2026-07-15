import React from 'react'
import { users } from '../../data/users'

const Projects = () => {
  return (
    <div className="left-100">
      <h1>Explore</h1>
      <p>Welcome to the explore page!</p>
      <p>{users.projects.map((project, index) => (
        <div key={index}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}</p>
    </div>
  )
}

export default Projects

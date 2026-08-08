import React from 'react'
import { fetchProject } from './fetchProject';

const page = async ({ params }) => {
    
    const projectId = Number(params.id);
    const project = await fetchProject(projectId);

    console.log("Project ID:", projectId);
    console.log("Type", typeof projectId);
    console.log("Project details:", project);

    if (!project) {
        return (
            <h1>Project not found</h1>
        )
    }

  return (
    <div>
      <h1>{project.event_details.projects[0].name}</h1>
      <p>{project.event_details.projects[0].description}</p>
    </div>
  )
}

export default page

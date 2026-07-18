"use client"

import React, { useState } from 'react'
import { users } from '../../../data/users'

const CreateProject = () => {
    const [name, setName] = useState("New Project");
    const [description, setDescription] = useState("Description for New Project");
    const currentUser = users.find(u => u.id === 1);
    const [projects, setProjects] = useState(currentUser ? currentUser.projects : []);

    const handleProjectCreation = (Pname, Pdescription) => {
        console.log("New project created!");
        setProjects([...projects, { name: Pname, description: Pdescription }]);
    }

    return (
        <div className="absolute left-50 top-20">
            <h1>Create a New Project</h1>

            <div id='formNameInput'>
                <h2>Project Name:</h2>
                <input onChange={ (e) => { setName(e.target.value); } } id="projectName" type="text" placeholder="Enter project name" />
            </div>

            <div id='formDescriptionInput'>
                <h2>Project Description:</h2>
                <textarea onChange={ (e) => { setDescription(e.target.value); } } id="projectDescription" placeholder="Enter project description"></textarea>
            </div>

            <button onClick={ () => handleProjectCreation(name, description) }>Create Project</button>

            <h2>Projects:</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CreateProject

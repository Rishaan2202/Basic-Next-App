"use client"

import React, { useEffect, useState } from 'react'
import { ProjectCreation } from '@/app/components/projectCreation'
import { FetchProjects } from '@/app/components/fetchProjects'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CreateProject = () => {

    console.log("CreateProject component rendered");

    const [name, setName] = useState("New Project");
    const [description, setDescription] = useState("Description for New Project");
    const [demo_url, setDemoUrl] = useState("");
    const [code_url, setCodeUrl] = useState("");
    const [hackatime_project_name, setHackatimeProjectName] = useState("");
    const [projects, setProjects] = useState([]);

    const router = useRouter();

    useEffect(() => {
        console.log("Fetching projects for selection...");

        const fetchProjects = async () => {
            try {
                const projectsData = await FetchProjects();
                console.log("Projects fetched successfully:", projectsData);
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectCreation = (name, description, demo_url, code_url, hackatime_project_name) => {
        console.log("New project created!");
        ProjectCreation(name, description, demo_url, code_url, hackatime_project_name);
        router.push('/home');
    }

    console.log("Projects fetched for selection:", projects);

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

            <div id='formDemoUrlInput'>
                <h2>Demo URL:</h2>
                <input onChange={ (e) => { setDemoUrl(e.target.value); } } id="demoUrl" type="text" placeholder="Enter demo URL" />
            </div>

            <div id='formCodeUrlInput'>
                <h2>Code URL:</h2>
                <input onChange={ (e) => { setCodeUrl(e.target.value); } } id="codeUrl" type="text" placeholder="Enter code URL" />
            </div>

            <div id='formHackatimeProjectNameInput'>
                <label htmlFor="hackatimeProjectName">Hackatime Project Name:</label>
                <select className='w-30 text-black bg-white' onChange={ (e) => { setHackatimeProjectName(e.target.value); } } id="hackatimeProjectName">
                    {projects.map((projectName, index) => (
                        <option key={index} value={projectName}>{projectName}</option>
                    ))}
                </select>
            </div>

            <button onClick={ () => handleProjectCreation(name, description, demo_url, code_url, hackatime_project_name) }>Create Project</button>

            {/* <h2>Projects:</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default CreateProject
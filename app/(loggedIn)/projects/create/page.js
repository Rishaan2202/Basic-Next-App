"use client"

import React, { useEffect, useState } from 'react'
import { ProjectCreation } from '@/app/actions/projectCreation'
import { Length } from '@/app/actions/fetchProjectLength'
import { FetchProjects } from '@/app/actions/fetchProjects'
import { useRouter } from 'next/navigation'
import Error from '@/app/components/error'


const CreateProject = () => {

    console.log("CreateProject component rendered");

    const [name, setName] = useState("Name not Added!");
    const [description, setDescription] = useState("Description not added!");
    const [demo_url, setDemoUrl] = useState("");
    const [code_url, setCodeUrl] = useState("");
    const [hackatime_project_name, setHackatimeProjectName] = useState("No Hackatime Project Selected!");
    const [projects, setProjects] = useState([]);
    const [type, setType] = useState("No Type Selected!")
    const [error, setError] = useState({})

    const [id, setId] = useState(0);

    useEffect(() => {
        const getLength = async () => {
            try {
                const length = await Length();
                setId(length);
            } catch (error) {
                console.error("Error fetching project length:", error);
            }
        };

        getLength();
    }, [])


    const router = useRouter();

    useEffect(() => {

        console.log("Fetching projects for selection...");

        const fetchProjects = async () => {
            try {
                const projectsData = await FetchProjects();
                const projectDataArray = projectsData?.[0]?.hackatime_data?.[0]?.data?.projects || [];
                console.log("Projects fetched successfully:", projectDataArray);
                setProjects(projectDataArray);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();

    }, []);

    // console.log("Projects successfully fetched for selection");

    const handleProjectCreation = async (name, description, demo_url, code_url, hackatime_project_name, id, type) => {

        if (name.length > 15) {
            setError({ title: "Invalid Project Name", description: "Project name should not exceed 15 characters." });
            return;
        }

        if (description.length > 3000) {
            setError({ title: "Invalid Project Description", description: "Project description should not exceed 3000 characters." });
            return;
        }

        if (description.length < 50) {
            setError({ title: "Invalid Project Description", description: "Project description should be at least 50 characters long." });
            return;
        }

        try{

            let demoUrl = demo_url.trim();

            if (!demoUrl.startsWith("http://") && !demoUrl.startsWith("https://")) {
                demoUrl = "http://" + demo_url;
            }

            const demoUrlObj = new URL(demoUrl);

            if (!demoUrlObj.hostname.includes(".")) {
                throw new Error("Invalid hostname");
            }

        }
        catch (error) {
            setError({ title: error.message, description: "Please enter a valid demo URL." });
            return;
        }
        
        try{

            let codeUrl = code_url.trim();

            if (!codeUrl.startsWith("http://") && !codeUrl.startsWith("https://")) {
                codeUrl = "http://" + code_url;
            }

            const codeUrlObj = new URL(codeUrl);

            if (!codeUrlObj.hostname.includes(".")) {
                throw new Error("Invalid hostname");
            }

        }
        catch (error) {
            setError({ title: error.message, description: "Please enter a valid code URL." });
            return;
        }

        if (hackatime_project_name === "No Hackatime Project Selected!") {
            setError({ title: "Invalid Hackatime Project Name", description: "Please select a valid Hackatime project name." });
            return;
        }

        if (type === "No Type Selected!") {
            setError({ title: "Invalid Project Type", description: "Please select a valid project type." });
            return;
        }

        else {
            console.log("New project created!");
            await ProjectCreation(name, description, demo_url, code_url, hackatime_project_name, id, type);
            setId(id + 1);
            router.push('/home');
        }
    }


    if (Object.keys(error).length > 0) {
        return <Error name={error.title} description={error.description} />
    } 
    
    else {

        return (
            <div className="absolute left-50 top-20">
                <h1>Create a New Project</h1>

                <div id='formNameInput'>
                    <h2>Project Name:</h2>
                    <input onChange={(e) => { setName(e.target.value); }} id="projectName" type="text" placeholder="Enter project name" />
                </div>

                <div id='formDescriptionInput'>
                    <h2>Project Description:</h2>
                    <textarea onChange={(e) => { setDescription(e.target.value); }} id="projectDescription" placeholder="Enter project description"></textarea>
                </div>

                <div id='formDemoUrlInput'>
                    <h2>Demo URL:</h2>
                    <input onChange={(e) => { setDemoUrl(e.target.value.trim()); }} id="demoUrl" type="text" placeholder="Enter demo URL" />
                </div>

                <div id='formCodeUrlInput'>
                    <h2>Code URL:</h2>
                    <input onChange={(e) => { setCodeUrl(e.target.value.trim()); }} id="codeUrl" type="text" placeholder="Enter code URL" />
                </div>

                <div id='formHackatimeProjectNameInput'>
                    <label htmlFor="hackatimeProjectName">Hackatime Project Name:</label>
                    <select className='w-30 text-black bg-white' onChange={(e) => { setHackatimeProjectName(e.target.value); }} id="hackatimeProjectName">
                        <option value = "No Hackatime Project Selected!">Select Hackatime Project</option>
                        {projects.map((projectName, index) => (
                            <option key={index} value={projectName.name}>{projectName.name}</option>
                        ))}
                    </select>
                </div>

                <div id='projectTypeSelection'>
                    <label htmlFor="projectSelection">Project Type:</label>
                    <select className='w-30 text-black bg-white' onChange={(e) => { setType(e.target.value); }} id="projectSelection">
                        <option key="No Type Selected" value="No Type Selected!">Select Project Type</option>
                        <option key="Hardware" value="Hardware">Hardware</option>
                        <option key="Web Based" value="Web Based">Web Based</option>
                        <option key="Python" value="Python">Python</option>
                        <option key="Mac Based" value="Mac Based">Mac Based</option>
                        <option key="Windows Based" value="Windows Based">Windows Based</option>
                        <option key="Linux Based" value="Linux Based">Linux Based</option>
                    </select>
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleProjectCreation(name, description, demo_url, code_url, hackatime_project_name, id, type)}>Create Project</button>

            </div>
        )
    }
}

export default CreateProject
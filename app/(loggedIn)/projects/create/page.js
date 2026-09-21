"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ProjectCreation } from '@/app/actions/project_creation'
import { Length } from '@/app/actions/fetch_project_length'
import { FetchProjects } from '@/app/actions/fetch_projects'
import { useRouter } from 'next/navigation'
import Error from '@/app/components/error'
import '@/app/globals.css'


const CreateProject = () => {

    console.log("CreateProject component rendered");

    const [name, setName] = useState("Name not Added!");
    const [description, setDescription] = useState("Description not added!");
    const [demo_url, setDemoUrl] = useState("");
    const [code_url, setCodeUrl] = useState("");
    const [screenshot, setScreenshot] = useState("")
    const [realScreenshot, setRealScreenshot] = useState("")
    const [isAI, setIsAI] = useState(false)
    const [aiDescription, setAiDescription] = useState("");
    const [hackatime_project_name, setHackatimeProjectName] = useState("No Hackatime Project Selected!");
    const [hours, setHours] = useState(0)
    const [projects, setProjects] = useState([]);
    const [type, setType] = useState("No Type Selected!")
    const [error, setError] = useState({})
    const [id, setId] = useState(0);

    const router = useRouter();

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

    useEffect(() => {
        if (screenshot) {
            const uploadScreenshot = async () => {

                try {

                    const formData = new FormData();
                    formData.append('file', screenshot);

                    const response = await fetch('/cdn', {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    console.log("Screenshot uploaded successfully. URL:", data.url);
                    setRealScreenshot(data.url);

                } catch (error) {
                    console.error("Error uploading screenshot:", error);
                }

            };

            uploadScreenshot();
        }
    }, [screenshot])


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

    const handleProjectCreation = async (name, description, demo_url, code_url, screenshot, hackatime_project_name, id, type, hours) => {

        if (name.length > 15) {
            setError({ title: "Invalid Project Name", description: "Project name should not exceed 15 characters." });
            return;
        }

        if (description.length > 120) {
            setError({ title: "Invalid Project Description", description: "Project description should not exceed 80 characters." });
            return;
        }

        if (description.length < 20) {
            setError({ title: "Invalid Project Description", description: "Project description should be at least 20 characters long." });
            return;
        }

        try {

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

        try {

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

        if (!screenshot) {
            setError({ title: "Screenshot Not Uploaded", description: "Please upload a screenshot for the project." });
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
            await ProjectCreation(name, description, demo_url, code_url, screenshot, hackatime_project_name, id, type, hours);
            setId(id + 1);
            router.push('/home');
        }
    }


    if (Object.keys(error).length > 0) {
        return <Error name={error.title} description={error.description} />
    }

    else {

        return (
            <>
                <h1 className='absolute left-50 top-20 text-2xl font-bold'>Create a New Project</h1>

                <div className="absolute left-50 top-30 bg-[var(--black)] text-white p-4 rounded shadow-lg w-[80vw]">

                    <div id='formNameInput' className='m-2'>
                        <h2>Project Name:</h2>
                        <input className='bg-[var(--blue)] p-1.5 text-black rounded w-[76vw]' onChange={(e) => { setName(e.target.value); }} id="projectName" type="text" placeholder="Enter project name" />
                    </div>

                    <div id='formDescriptionInput' className='m-2'>
                        <h2>Project Description:</h2>
                        <textarea className='bg-[var(--blue)] text-black p-1.5 rounded w-[76vw]' onChange={(e) => { setDescription(e.target.value); }} id="projectDescription" placeholder="Enter project description"></textarea>
                    </div>

                    <div id='formDemoUrlInput' className='m-2'>
                        <h2>Demo URL:</h2>
                        <input className='bg-[var(--blue)] text-black p-1.5 rounded w-[76vw]' onChange={(e) => { setDemoUrl(e.target.value.trim()); }} id="demoUrl" type="text" placeholder="Enter demo URL" />
                    </div>

                    <div id='formCodeUrlInput' className='m-2'>
                        <h2>Code URL:</h2>
                        <input className='bg-[var(--blue)] text-black p-1.5 rounded w-[76vw]' onChange={(e) => { setCodeUrl(e.target.value.trim()); }} id="codeUrl" type="text" placeholder="Enter code URL" />
                    </div>

                    <div className='flex'>

                        <div className='flex flex-col items-center'>

                            <div id='projectScreenshot' className='m-2'>
                                <h2>Screenshot:</h2>
                                <input className='bg-[var(--red)] text-black p-1.5 rounded w-[35vw]' type="file" accept="image/*" onChange={(e) => {
                                    setScreenshot(e.target.files[0]);
                                }
                                } />
                            </div>

                            <Image src={realScreenshot || "/default_screenshot.png"} alt="Project Screenshot" width={440} height={200} className='rounded' />

                        </div>

                        <div>

                            <div id='formHackatimeProjectNameInput' className='m-2'>

                                <label htmlFor="hackatimeProjectName">Hackatime Project Name:</label>

                                <select className='w-30 text-black w-[40vw] bg-[var(--yellow)] p-1.5 rounded' onChange={(e) => {

                                    const selectedProject = projects.find(project => project.name === e.target.value);

                                    setHackatimeProjectName(e.target.value);
                                    setHours(selectedProject.total_seconds / 3600);

                                }} id="hackatimeProjectName">

                                    <option value="No Hackatime Project Selected!">Select Hackatime Project</option>

                                    {projects.map((projectName, index) => (
                                        <option key={index} value={projectName.name}>
                                            {projectName.name}
                                        </option>
                                    ))}

                                </select>
                            </div>

                            <div id='projectTypeSelection' className='m-2'>
                                <label htmlFor="projectSelection">Project Type:</label>
                                <select className='w-30 text-black w-[40vw] bg-[var(--yellow)] mb-2 p-1.5 rounded' onChange={(e) => { setType(e.target.value); }} id="projectSelection">
                                    <option key="No Type Selected" value="No Type Selected!">Select Project Type</option>
                                    <option key="Hardware" value="Hardware">Hardware</option>
                                    <option key="Web Based" value="Web Based">Web Based</option>
                                    <option key="Python" value="Python">Python</option>
                                    <option key="Mac Based" value="Mac Based">Mac Based</option>
                                    <option key="Windows Based" value="Windows Based">Windows Based</option>
                                    <option key="Linux Based" value="Linux Based">Linux Based</option>
                                </select>
                            </div>

                            <div id='aiUsageInput' className='m-2 p-2 bg-[var(--green)] w-[40vw] rounded'>
                                <div className='flex gap-3'>
                                    <input type="checkbox" id="aiUsageCheckbox" onChange={(e) => { setIsAI(e.target.checked); }} />
                                    <h2 className='text-[var(--white)] text-xl'>I have Used AI in this project</h2>
                                </div>
                                <p className='text-[var(--black)] text-xs'>If you have used AI in any way in this project, then check the box above and describe how you used it, so we could determine if it's under the allowed limit. You can use at most 30% of AI in your entire project. If you use it more than that, then you might get banned from this program or even future Hack Club programs!</p>
                                <textarea disabled={!isAI} className='border-2 relative top-2 text-black p-1.5 rounded w-[39vw]' onChange={(e) => { setAiDescription(e.target.value); }} id="aiDescription" placeholder="Describe how you used AI in your project!"></textarea>
                            </div>

                        </div>

                    </div>

                    <button className="bg-[var(--red)] hover:scale-[1.1] hover:cursor-pointer text-white font-bold py-2 px-4 rounded relative" onClick={() => handleProjectCreation(name, description, demo_url, code_url, realScreenshot, hackatime_project_name, id, type, hours)}>Create Project</button>
                    <button className="bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer text-white font-bold py-2 px-4 rounded relative m-2" onClick={() => router.push('/projects')}>Cancel</button>

                </div>
            </>
        )
    }
}

export default CreateProject
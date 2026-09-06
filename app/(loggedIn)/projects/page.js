"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter();

    return (
        <div className="absolute left-50 top-20">
            <h1>Projects</h1>
            <button onClick={() => router.push('/projects/create')} className="bg-sky-600/80 p-2">+ Create Project</button>
        </div>
    )
}

export default page

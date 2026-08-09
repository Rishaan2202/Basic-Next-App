"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter();

    return (
        <div>
            <h1>Projects</h1>
            <button onClick={() => router.push('/projects/create')}>Create Project</button>
        </div>
    )
}

export default page

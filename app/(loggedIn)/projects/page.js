"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import '@/app/globals.css'

const page = () => {

    const router = useRouter();

    return (
        <div className="absolute left-50 top-20">
            <h1>Projects</h1>
            <button onClick={() => router.push('/projects/create')} className="bg-[var(--red)] p-2 rounded text-white hover:bg-[var(--green)] hover:scale-[1.1] hover:cursor-pointer">+ Create Project</button>
        </div>
    )
}

export default page

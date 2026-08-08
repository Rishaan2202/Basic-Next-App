import React from 'react'

const page = async ({ params }) => {

    const projectId = await params.projectId;

    return (
        <div>
            <h1>This is your project!</h1>
        </div>
    )
}

export default page

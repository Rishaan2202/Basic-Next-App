import React from 'react'
import '@/app/globals.css'

const page = () => {

  console.log(process.env.HACKATIME_UID)
  console.log(process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI)

  return (
    <div className="absolute left-50 top-20">
      <h1 className="text-2xl font-bold m-2">Link Your Hackatime Account To Continue</h1>
      <a className="bg-[var(--tertiary)] hover:bg-[var(--secondary)] hover:scale-[1.1] m-2 text-black font-bold py-2 px-4 rounded" href={`https://hackatime.hackclub.com/oauth/authorize?client_id=${process.env.HACKATIME_UID}&redirect_uri=${process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI}&response_type=code&scope=profile+read`}>Link Hackatime Account</a>
    </div>
  )
}

export default page
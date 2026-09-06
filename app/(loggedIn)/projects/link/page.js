import React from 'react'

const page = () => {

  console.log(process.env.HACKATIME_UID)
  console.log(process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI)

  return (
    <div className="absolute left-50 top-20">
      <h1 className="text-2xl font-bold m-2">Link Your Hackatime Account To Continue</h1>
      <a className="bg-sky-700 hover:bg-sky-600 m-2 text-white font-bold py-2 px-4 rounded" href={`https://hackatime.hackclub.com/oauth/authorize?client_id=${process.env.HACKATIME_UID}&redirect_uri=${process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI}&response_type=code&scope=profile+read`}>Link Hackatime Account</a>
    </div>
  )
}

export default page
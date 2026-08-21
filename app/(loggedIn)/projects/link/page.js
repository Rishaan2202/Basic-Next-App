import React from 'react'

const page = () => {

  console.log(process.env.HACKATIME_UID)
  console.log(process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI)

  return (
    <div>
      <h1>Link Your Hackatime Account To Continue</h1>
        <a href={`https://hackatime.hackclub.com/oauth/authorize?client_id=${process.env.HACKATIME_UID}&redirect_uri=${process.env.NEXT_PUBLIC_HACKATIME_REDIRECT_URI}&response_type=code&scope=profile+read`}>Link Hackatime Account</a>
    </div>
  )
}

export default page
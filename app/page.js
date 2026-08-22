import React from 'react'
import Link from 'next/link'

export default function Page() {

  const clientId = process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return <>
    <h1 className="absolute left-1/2 top-2/5 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-bold text-white">Hackalympics</h1>
    <button><Link className='absolute left-1/2 top-[350px] transform -translate-x-1/2 -translate-y-1/2 bg-sky-800/50 m-2 p-2 w-[100px] rounded hover:bg-sky-700' href={`https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email%20name%20slack_id%20verification_status`}>Login</Link></button>
    {/* <img src="/japan.png" alt="Flyer"/> */}
  </>
}
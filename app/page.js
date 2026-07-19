import React from 'react'
import Link from 'next/link'

export default function Page() {

  const clientId = process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return <>
    <h1 className="text-3xl font-bold text-white mx-4 mt-4">Rishaan</h1>
    <button><Link href={`https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email%20name%20slack_id%20verification_status`}>Login</Link></button>
  </>
}
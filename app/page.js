import React from 'react'
import Link from 'next/link'

export default function Page() {

  const clientId = process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return <>
    <button><Link href={`https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`}>Login</Link></button>
  </>
}
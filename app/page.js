import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

export default function Page() {

  const clientId = process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return <>
    <Link href='https://hackclub.com' target='_blank'>
      <Image 
        src='https://assets.hackclub.com/flag-orpheus-left.svg'
        alt='Hack Club!'
        width={250}
        height={200}
        className='absolute left-0 h-auto-max-w-full'
      />
    </Link>
    <h1 className="absolute left-1/2 top-2/5 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold hover:cursor-default">Hackalympics</h1>
    <button><Link className='absolute text-xl left-1/2 top-[60vh] transform -translate-x-1/2 -translate-y-1/5 bg-[var(--tertiary)] m-2 p-2 w-[10vw] text-[var(--primary)] rounded hover:bg-[var(--secondary)] hover:scale-[1.1]' href={`https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email%20name%20slack_id%20verification_status`}>Login</Link></button>
  </>
}

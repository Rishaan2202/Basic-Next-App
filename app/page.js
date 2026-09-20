import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

export default function Page() {

  const clientId = process.env.NEXT_PUBLIC_HACKCLUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return <div>

    <Link href='https://hackclub.com' target='_blank'>
      <Image
        src='https://assets.hackclub.com/flag-orpheus-left.svg'
        alt='Hack Club!'
        width={250}
        height={200}
        className='absolute left-0 h-auto-max-w-full'
      />
    </Link>
    
    <h1 className="absolute left-1/2 top-3/10 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold hover:cursor-default">Hackalympics</h1>
    <p className='absolute left-1/2 top-1/2 text-xl text-[var(--green)] transform -translate-x-1/2 -translate-y-1/2 w-fit font-bold hover:cursor-default'>A week long <span className='text-[var(--blue)]'>OLYMPICS</span> themed YSWS in <span className='text-[var(--red)]'>TOKYO</span>, <span className='text-[var(--yellow)]'>JAPAN</span></p>
    <button><Link className='absolute text-xl left-1/2 top-[60vh] transform -translate-x-1/2 -translate-y-1/5 bg-[var(--black)] m-2 p-2 w-[10vw] text-[var(--primary)] rounded hover:scale-[1.1]' href={`https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email%20name%20slack_id%20verification_status`}>Login</Link></button>

    <div className='bg-[var(--black)] w-[100vw] h-[250vh] absolute top-[100vh] left-0 z-[-1]'></div>

    <div className='absolute top-[101vh]'>

      <h1 className='text-7xl relative left-[18vw] top-[5vh] text-[var(--yellow)]'>What is This?</h1>

      <div className='relative m-2 p-3 right-[10vw] top-[3vh] rounded hover:scale-[1.1]'>

        <div className='relative left-[4vw]'>

          <Image
            src='https://cdn.hackclub.com/01a08f40-3870-7994-85dd-b7298d07fa0f/image.webp'
            alt='PCB Image'
            width={250}
            height={200}
            className='rounded relative top-5 rotate-[-5deg] z-[1] hover:scale-[1.1]'
          />
          <Image
            src='https://cdn.hackclub.com/01a08f41-9c2f-7c40-b321-1ab53c56b6cc/pixel%20game%20image.png'
            alt='Pixel Game Image'
            width={250}
            height={200}
            className='rounded relative bottom-10 left-15 rotate-[5deg] hover:scale-[1.1]'
          />
          <Image
            src='https://cdn.hackclub.com/01a09615-30bd-7950-9e12-e72e127e1672/37.D-fdhD8h_1oGfER.webp'
            alt='Prode Dies Image'
            width={100}
            height={200}
            className='rounded relative bottom-35 right-2 z-[2] rotate-[-10deg] hover:scale-[1.1]'
          />
          <Image
            src='https://cdn.hackclub.com/01a0961b-8a0c-7a7b-8665-6f333386ec6f/Screenshot%202026-09-12%20202228.png'
            alt='Pixel Game Image'
            width={150}
            height={200}
            className='rounded relative bottom-50 left-20 rotate-[3deg] hover:scale-[1.1]'
          />

        </div>

        <h2 className='text-5xl relative bottom-45 text-[var(--blue)]'>Build Cool Projects!</h2>

      </div>

      <div className='relative left-[45vw]'>

        <Image
          src='https://cdn.hackclub.com/01a0bfe8-7784-728a-9ad7-36f62412e5eb/Untitled%20design%20(5).png'
          alt='Pixel Game Image'
          width={280}
          height={200}
          className='rounded relative bottom-50 left-20 rotate-[3deg] hover:scale-[1.1]'
        />


        <h2 className='text-5xl relative bottom-45 text-[var(--green)]'>Ship' em when ready!</h2>

      </div>

      <div className='relative left-[-4vw]'>

        <Image
          src='https://cdn.hackclub.com/01a0bfed-dfce-7bae-b564-26c5d4c958f2/Untitled%20design%20(7).png'
          alt='Arrow Image'
          width={300}
          height={200}
          className='relative rounded'
        />

        <h2 className='text-5xl right-[1vw] relative top-[5vh] text-[var(--green)]'>Earn Currency!</h2>

      </div>
    </div>

  </div>
}
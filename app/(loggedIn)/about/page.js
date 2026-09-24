import React from 'react'
import { fetchUsers } from '@/app/actions/fetch_users';
import '@/app/globals.css'
import { cookies } from 'next/headers';

const About = async () => {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const users = await fetchUsers(userId);
  return (
    <div className='w-fit text-[var(--blue)]'>

      <h1 className='font-bold text-3xl absolute top-20'>About</h1>

      <div className='relative top-[20vh] m-1 w-fit p-1 rounded bg-[var(--black)]'>

        <h1 className='text-[var(--yellow)] relative left-[37%] text-xl p-1'>Basic Details</h1>

        <div className='flex justify-between w-[35vw] p-1'>

          <h2 className='p-1 relative left-[15%]'>Name:</h2>

          <div className='bg-[var(--red)] w-[18vw] p-1 text-white rounded'>
            <h2 className='relative'>{users[0]?.name || 'User Not Found!'}</h2>
          </div>

        </div>

        <div className='flex justify-between w-[35vw] p-1'>

          <h2 className='p-1 relative left-[15%]'>Email:</h2>

          <div className='bg-[var(--red)] w-[18vw] p-1 text-white rounded'>
            <h2>{users[0]?.email || 'No Email Found!'}</h2>
          </div>

        </div>

        <div className='flex justify-between w-[35vw] p-1'>

          <h2 className='p-1 relative left-[13%]'>Slack ID:</h2>

          <div className='bg-[var(--yellow)] w-[18vw] p-1 text-white rounded'>
            <h2 className='relative'>{users[0]?.slack_id || 'No Slack ID found!'}</h2>
          </div>

        </div>

        <div className='flex justify-between w-[35vw] p-1'>

          <h2 className='p-1 relative left-[6%]'>Verification Status:</h2>

          <div className='bg-[var(--green)] w-[18vw] p-1 text-white rounded'>
            <h2 className='relative'>{users[0]?.verification_status || 'No Verification Status found!'}</h2>
          </div>

        </div>

      </div>

    </div>
  )
}

export default About

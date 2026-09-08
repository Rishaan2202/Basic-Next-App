import React from 'react'
import { fetchUsers } from '@/app/actions/fetchUsers';

const About = async () => {
  const users = await fetchUsers();
  return (
    <div>
      <h1 className='font-bold text-3xl absolute top-20'>About</h1>
    </div>
  )
}

export default About

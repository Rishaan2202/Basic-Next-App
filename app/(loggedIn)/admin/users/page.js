import React from 'react'
import { fetchUsers } from '@/app/actions/fetchUsers';

const Users = async () => {
  const users = await fetchUsers();
  return (
    <div className="absolute left-50 top-20">
      <h1 className='font-bold text-3xl'>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="bg-sky-300/60 m-2 p-2 rounded text-black w-fit">
            <h2>{user.id}</h2>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
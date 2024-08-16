import React from 'react'
import { useSelector } from 'react-redux';
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
          <img className='rounded-full self-center h-24 w-24' src={currentUser.avatar} alt='profile'></img>
          <input className='border p-3 rounded-lg' type='text' placeholder='userName' id='userName'></input>
          <input className='border p-3 rounded-lg' type='email' placeholder='email' id='email'></input>
          <input className='border p-3 rounded-lg' type='password' placeholder='password' id='password'></input>
          <button className='border p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-85'>UPDATE</button>
          <div className='flex justify-between mt-5'>
            <span className='text-red-700 cursor-pointer'>Delete Account</span>
            <span className='text-red-700 cursor-pointer'>Sign Out</span>
          </div>
        </form>
    </div>
  )
}

export default Profile;
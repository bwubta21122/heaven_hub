

import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Oath = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Welcome to Heaven Hub</h1>
        {errorMessage && <p className='text-red-500 text-sm mb-4'>{errorMessage}</p>}
        <button onClick={handleClick} type='button' className='bg-red-600 text-white py-3 rounded-lg w-full hover:bg-red-700 transition duration-200'>
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Oath;


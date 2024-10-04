
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <>
      <header className='fixed top-0 left-0 w-full bg-white z-50 shadow-lg'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
          <Link to='/'>
            <h1 className='font-bold text-xl flex flex-wrap'>
              <span className='text-blue-600'>Heaven</span>
              <span className='text-gray-800'>Hub</span>
            </h1>
          </Link>

          <form onSubmit={handleSubmit} className='bg-gray-100 p-2 rounded-lg flex items-center w-full max-w-md'>
            <input
              type='text'
              placeholder='Search...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='bg-transparent focus:outline-none w-full p-2 rounded-l-lg'
            />
            <button type="submit" className='bg-blue-600 text-white p-2 rounded-r-lg flex items-center justify-center'>
              <FaSearch />
            </button>
          </form>

          <nav className='flex gap-6'>
            <Link to='/home' className='hidden sm:block text-gray-700 hover:text-blue-600'>Home</Link>
            <Link to='/about' className='hidden sm:block text-gray-700 hover:text-blue-600'>About</Link>
            <Link to='/profile'>
              {currentUser ? (
                <img className='rounded-full h-8 w-8 object-cover border-2 border-gray-300' src={currentUser.avatar} alt='profile' />
              ) : (
                <span className='text-gray-700 hover:text-blue-600'>Sign In</span>
              )}
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
